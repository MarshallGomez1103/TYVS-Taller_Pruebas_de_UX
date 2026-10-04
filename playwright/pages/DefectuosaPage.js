// Esta pantalla carece deliberadamente de nombres accesibles.
// Por eso sus localizadores usan IDs estables, encapsulados aquí.
const { RegistroPage } = require('./RegistroPage');
class DefectuosaPage extends RegistroPage {
  constructor(page) {
    super(page);
    this.nombre = page.locator('#d-nombre');
    this.documento = page.locator('#d-documento');
    this.edad = page.locator('#d-edad');
    this.botonRegistrar = page.locator('#d-btn-registrar');
    this.tituloResultado = page.locator('#resultado-titulo');
    this.error = page.locator('#d-error');
    this.regionesStatus = page.locator('[role="status"]');
    this.regionesVivas = page.locator('[aria-live]');
    this.statusAnunciado = page.locator('[role="status"][aria-live="polite"]');
  }
  async abrir() { await this.page.goto('/defectuosa.html'); }
}
module.exports = { DefectuosaPage };
