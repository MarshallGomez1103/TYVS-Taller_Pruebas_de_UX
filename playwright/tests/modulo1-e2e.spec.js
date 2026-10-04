// @ts-check
const { test, expect } = require('@playwright/test');
const { RegistroPage } = require('../pages/RegistroPage');

/**
 * MÓDULO 1 — Pruebas de UI de punta a punta (E2E)
 *
 * Estas NO son pruebas de UX. Son pruebas funcionales que manejan un
 * navegador: verifican que la interfaz haga lo que promete. La diferencia
 * importa, y el Módulo 3 la desarrolla.
 *
 * Dos reglas que se aplican en todo el archivo:
 *
 * 1. Selectores por ROL y por texto visible, no por clase CSS ni por XPath.
 *    getByRole('button', { name: 'Registrar votante' }) sobrevive a un
 *    rediseño; '.btn-primary.mt-3' se rompe con el primer cambio de estilos.
 *    Además, buscar por rol prueba de paso que el elemento es accesible.
 *
 * 2. Cero esperas fijas. Playwright reintenta cada aserción hasta que se
 *    cumple o expira el tiempo. Un sleep(3000) es una apuesta: lento cuando
 *    la app responde rápido, insuficiente cuando responde lento.
 */

/**
 * Un documento distinto en cada llamada, para no chocar con la regla de
 * duplicados, que es estado acumulado en el servidor.
 *
 * Antes se usaba Date.now() % 1000000 más un número distinto por prueba. Parece
 * único y no lo es: al ejecutar la misma prueba varias veces en paralelo
 * (--repeat-each, la forma estándar de cazar pruebas inestables), dos copias
 * arrancan en el mismo milisegundo y sacan el mismo documento. Se midió: con
 * --repeat-each=30 y 8 workers, una de cada 30 fallaba con "Documento ya
 * inscrito".
 */
const documentoUnico = () => Math.floor(Math.random() * 900_000_000) + 100_000;

test.describe('Módulo 1 — Inscripción de votantes', () => {
  let registro;

  test.beforeEach(async ({ page }) => {
    registro = new RegistroPage(page);
    await registro.abrir();
  });

  test('01 - La página carga con el título correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/Registraduría/);
    await expect(
      registro.encabezado
    ).toBeVisible();
  });

  test('02 - El formulario muestra todos sus campos', async ({ page }) => {
    await expect(registro.nombre).toBeVisible();
    await expect(registro.documento).toBeVisible();
    await expect(registro.edad).toBeVisible();
    await expect(registro.genero).toBeVisible();
    await expect(registro.vivo).toBeVisible();
  });

  test('03 - Registra a una persona válida', async ({ page }) => {
    // Arrange: un documento único por corrida evita chocar con la regla
    // de duplicados, que es estado acumulado en el servidor.
    const documento = documentoUnico();

    // Act
    await registro.nombre.fill('Ana Martínez');
    await registro.documento.fill(String(documento));
    await registro.edad.fill('30');
    await registro.genero.selectOption('FEMALE');
    await registro.botonRegistrar.click();

    // Assert
    await registro.esperarResultado('Inscripción exitosa');
  });

  test('04 - Rechaza a una persona menor de edad', async ({ page }) => {
    const documento = documentoUnico();

    await registro.nombre.fill('Sara Gómez');
    await registro.documento.fill(String(documento));
    await registro.edad.fill('17');
    await registro.botonRegistrar.click();

    await registro.esperarResultado('Persona menor de edad');
    await expect(registro.resultado).toContainText('18 años o más');
  });

  test('05 - Rechaza a una persona no viva', async ({ page }) => {
    const documento = documentoUnico();

    await registro.nombre.fill('Pedro Ruiz');
    await registro.documento.fill(String(documento));
    await registro.edad.fill('45');
    // Desmarcar la casilla: la persona no está viva.
    await registro.vivo.uncheck();
    await registro.botonRegistrar.click();

    await registro.esperarResultado('Persona no viva');
  });

  test('06 - Rechaza un documento ya inscrito', async ({ page }) => {
    const documento = documentoUnico();

    // Arrange: primera inscripción, que debe salir bien
    await registro.nombre.fill('Luis Torres');
    await registro.documento.fill(String(documento));
    await registro.edad.fill('40');
    await registro.botonRegistrar.click();
    await registro.esperarResultado('Inscripción exitosa');

    // Act: el mismo documento, otra persona
    await registro.nombre.fill('Luisa Torres');
    await registro.botonRegistrar.click();

    // Assert
    await registro.esperarResultado('Documento ya inscrito');
  });

  test('07 - Valida en el navegador antes de llamar al servicio', async ({ page }) => {
    // Un documento negativo ni siquiera debería viajar al servidor.
    await registro.nombre.fill('Error Esperado');
    await registro.documento.fill('-5');
    await registro.edad.fill('30');
    await registro.botonRegistrar.click();

    await expect(
      registro.errores.documento
    ).toBeVisible();
  });

  test('08 - El formulario se puede completar solo con el teclado', async ({ page }) => {
    // Operable por teclado es un requisito de WCAG 2.1.1, y también la forma
    // en que trabaja mucha gente. Si esta prueba falla, hay un problema real
    // de accesibilidad, no un detalle estético.
    const documento = documentoUnico();

    await registro.inscribirConTeclado(documento);

    await registro.esperarResultado('Inscripción exitosa');
  });

  test('09 - La regla de edad imposible vive en DOS capas, y hay que probar las dos', async ({ page, request }) => {
    // Este es el caso que más se escapa en una suite E2E, y merece leerse
    // entero antes de copiarlo.
    //
    // El dominio distingue una edad IMPOSIBLE (menor que 0 o mayor que 120,
    // que devuelve INVALID_AGE) de una edad de MENOR (0 a 17, que devuelve
    // UNDERAGE). Son dos clases de equivalencia distintas.
    //
    // Pero el navegador aplica la MISMA regla antes de enviar. Consecuencia:
    // por la interfaz es imposible provocar un INVALID_AGE. Si solo se prueba
    // por la UI, se concluiría que la regla del servidor no existe o no hace
    // falta — y las dos conclusiones son falsas.

    // Capa 1 — el navegador detiene el caso y NO llama al servicio.
    let huboLlamada = false;
    page.on('request', (r) => {
      if (r.url().includes('/register') && r.method() === 'POST') huboLlamada = true;
    });

    await registro.nombre.fill('Edad Imposible');
    await registro.documento.fill(String(documentoUnico()));
    await registro.edad.fill('150');
    await registro.botonRegistrar.click();

    await expect(registro.errores.edad).toBeVisible();
    expect(huboLlamada, 'El navegador no debería haber llamado al servicio').toBe(false);

    // Capa 2 — la API sí es alcanzable sin pasar por el formulario, y ahí la
    // regla del servidor es lo único que protege el dato. Es exactamente lo
    // que hace el taller de pruebas de carga: golpear /register directamente.
    const respuesta = await request.post('/register', {
      data: { name: 'Edad Imposible', id: documentoUnico(), age: 150, gender: 'MALE', alive: true },
    });

    expect(respuesta.status()).toBe(200);
    expect((await respuesta.text()).trim()).toBe('INVALID_AGE');
  });
});
