const { test, expect } = require('@playwright/test');
const { RegistroPage } = require('../pages/RegistroPage');

// Experimento separado: debe FALLAR, sin actualizar referencias.
// La ruta solo afecta a este contexto del navegador y desaparece al cerrarlo.
test('Detecta un cambio temporal del color de la cabecera', async ({ page }) => {
  await page.route('**/estilos.css', async route => {
    const respuesta = await route.fetch();
    const css = await respuesta.text();
    await route.fulfill({ response: respuesta, body: css + '\nheader { background: #b70000 !important; }\n' });
  });
  const registro = new RegistroPage(page);
  await registro.abrir();
  await expect(registro.botonRegistrar).toBeVisible();
  await expect(page).toHaveScreenshot('formulario-vacio.png', { fullPage: true, maxDiffPixelRatio: 0.02 });
});
