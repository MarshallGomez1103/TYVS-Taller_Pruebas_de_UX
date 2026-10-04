// @ts-check
const { test, expect } = require('@playwright/test');
const { RegistroPage } = require('../pages/RegistroPage');

/**
 * MODULO 2 — Page Object Model
 *
 * Compare estas pruebas con las del modulo 1: dicen lo MISMO, pero se leen
 * como reglas de negocio en vez de como secuencias de clics. Ese es el punto
 * del patron: separar QUE se prueba de COMO se interactua con la pantalla.
 */
test.describe('Modulo 2 — Reglas de inscripcion (con POM)', () => {

  let registro;

  test.beforeEach(async ({ page }) => {
    registro = new RegistroPage(page);
    await registro.abrir();
  });

  test('01 - Una persona adulta y viva queda inscrita', async () => {
    await registro.inscribir({ documento: RegistroPage.documentoUnico(), edad: 30 });
    await registro.esperarResultado('Inscripción exitosa');
  });

  test('02 - Una persona de 17 anios es rechazada', async () => {
    await registro.inscribir({ documento: RegistroPage.documentoUnico(), edad: 17 });
    await registro.esperarResultado('Persona menor de edad');
  });

  test('03 - Una persona de 18 anios queda inscrita (valor limite)', async () => {
    await registro.inscribir({ documento: RegistroPage.documentoUnico(), edad: 18 });
    await registro.esperarResultado('Inscripción exitosa');
  });

  test('04 - Una persona no viva es rechazada', async () => {
    await registro.inscribir({ documento: RegistroPage.documentoUnico(), edad: 40, vivo: false });
    await registro.esperarResultado('Persona no viva');
  });

  test('05 - Un documento repetido es rechazado', async () => {
    const doc = RegistroPage.documentoUnico();

    await registro.inscribir({ documento: doc, nombre: 'Primera Vez' });
    await registro.esperarResultado('Inscripción exitosa');

    await registro.inscribir({ documento: doc, nombre: 'Segunda Vez' });
    await registro.esperarResultado('Documento ya inscrito');
  });
  for (const edad of [0, 16, 120]) {
    test(`Límite adicional de edad: ${edad}`, async () => {
      await registro.inscribir({ documento: RegistroPage.documentoUnico(), edad });
      await registro.esperarResultado(edad < 18 ? 'Persona menor de edad' : 'Inscripción exitosa');
    });
  }

  for (const [campo, valor] of [['nombre', '   '], ['documento', '0'], ['documento', '1.5'], ['edad', '18.9'], ['edad', ''], ['edad', '-1'], ['edad', '121']]) {
    test(`No envía ${campo} inválido: ${JSON.stringify(valor)}`, async () => {
      const envios = registro.observarEnvios();
      await registro.completar({ documento: RegistroPage.documentoUnico() });
      await registro[campo].fill(valor);
      await registro.enviar();
      await expect(registro.errores[campo]).toBeVisible();
      await registro.esperarResultado('Revise los datos');
      expect(envios).toEqual([]);
    });
  }

  test('La ayuda informa que 18 años también está permitido', async () => {
    await expect(registro.ayudaEdad).toBeVisible();
    await registro.inscribir({ documento: RegistroPage.documentoUnico(), edad: 18 });
    await registro.esperarResultado('Inscripción exitosa');
  });

  test('Recupera el formulario después de corregir un error', async () => {
    await registro.inscribir({ documento: RegistroPage.documentoUnico(), edad: 121 });
    await expect(registro.errores.edad).toBeVisible();
    await registro.edad.fill('30');
    await registro.enviar();
    await registro.esperarResultado('Inscripción exitosa');
    await expect(registro.errores.edad).toBeHidden();
    await expect(registro.edad).not.toHaveAttribute('aria-invalid', 'true');
  });

});
