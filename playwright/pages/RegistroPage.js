// @ts-check
const { expect } = require('@playwright/test');

/**
 * PAGE OBJECT MODEL de la pagina de inscripcion.
 *
 * La idea: la prueba habla el lenguaje del NEGOCIO ("inscribir un votante"),
 * y esta clase traduce eso a interacciones con el navegador.
 *
 * El beneficio real aparece cuando la interfaz cambia. Si el boton cambia de
 * texto, se corrige AQUI, en un solo lugar, y las 8 pruebas que lo usan
 * siguen funcionando sin tocarse. Sin POM habria que editar 8 archivos.
 */
class RegistroPage {

  constructor(page) {
    this.page = page;

    // Localizadores por ROL y texto visible: sobreviven a un rediseño y de
    // paso comprueban que el elemento es accesible.
    this.nombre = page.getByLabel('Nombre completo');
    this.documento = page.getByLabel('Número de documento');
    this.edad = page.getByLabel('Edad');
    this.genero = page.getByLabel('Género');
    this.vivo = page.getByLabel('La persona está viva');
    this.botonRegistrar = page.getByRole('button', { name: 'Registrar votante' });
    this.resultado = page.getByRole('status');
    this.encabezado = page.getByRole('heading', { name: 'Inscripción de votantes' });
    this.salto = page.getByRole('link', { name: 'Saltar al contenido principal' });
    this.ayudaEdad = page.getByText('Debe tener 18 años o más para votar.', { exact: true });
    this.errores = {
      nombre: page.getByText('Escriba el nombre completo.', { exact: true }),
      documento: page.getByText('El documento debe ser un número mayor que cero.', { exact: true }),
      edad: page.getByText('La edad debe estar entre 0 y 120.', { exact: true }),
    };
  }

  async abrir() {
    await this.page.goto('/');
  }

  /**
   * Inscribe a una persona. Los campos no indicados usan valores por defecto
   * razonables, para que cada prueba solo declare lo que le importa.
   */
  async inscribir({ nombre = 'Persona Prueba', documento, edad = 30, genero = 'FEMALE', vivo = true }) {
    await this.completar({ nombre, documento, edad, genero, vivo });
    await this.enviar();
  }

  /** Verifica el titulo del mensaje de resultado. */
  async esperarResultado(titulo) {
    await expect(this.page.getByRole('heading', { name: titulo })).toBeVisible();
  }

  async completar({ nombre = 'Persona Prueba', documento, edad = 30, genero = 'FEMALE', vivo = true }) {
    await this.nombre.fill(nombre);
    await this.documento.fill(String(documento));
    await this.edad.fill(String(edad));
    await this.genero.selectOption(genero);
    await this.vivo.setChecked(vivo);
  }

  async enviar() { await this.botonRegistrar.click(); }

  observarEnvios() {
    const envios = [];
    this.page.on('request', r => {
      if (new URL(r.url()).pathname === '/register' && r.method() === 'POST') envios.push(r.postDataJSON());
    });
    return envios;
  }

  async inscribirConTeclado(documento) {
    await this.nombre.focus();
    await this.page.keyboard.type('Persona Teclado');
    await this.page.keyboard.press('Tab');
    await expect(this.documento).toBeFocused();
    await this.page.keyboard.type(String(documento));
    await this.page.keyboard.press('Tab');
    await expect(this.edad).toBeFocused();
    await this.page.keyboard.type('33');
    await this.page.keyboard.press('Tab');
    await expect(this.genero).toBeFocused();
    await this.page.keyboard.press('Tab');
    await expect(this.vivo).toBeFocused();
    await this.page.keyboard.press('Tab');
    await expect(this.botonRegistrar).toBeFocused();
    await this.page.keyboard.press('Enter');
  }

  async camposSinEtiqueta() {
    return this.page.evaluate(() => Array.from(document.querySelectorAll('input, select, textarea'))
      .filter(c => !c.labels?.length && !c.getAttribute('aria-label') && !c.getAttribute('aria-labelledby'))
      .map(c => c.id));
  }

  async desbordaHorizontal() {
    return this.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  }

  /**
   * Genera un documento distinto en cada llamada.
   *
   * El rango es grande a proposito. Con 900.000 valores posibles, la
   * probabilidad de que dos pruebas saquen el mismo numero crece mucho mas
   * rapido de lo que parece (la paradoja del cumpleanos), y un choque produce
   * DUPLICATED y una prueba que falla sin motivo. Por arriba, el limite es el
   * int de Java del servidor (2.147.483.647).
   */
  static documentoUnico() {
    return Math.floor(Math.random() * 900_000_000) + 100_000;
  }
}

module.exports = { RegistroPage };
