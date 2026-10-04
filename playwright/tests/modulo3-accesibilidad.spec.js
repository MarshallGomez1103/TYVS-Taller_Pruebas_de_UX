// @ts-check
const { test, expect } = require('@playwright/test');
const { RegistroPage } = require('../pages/RegistroPage');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * MÓDULO 3 — Accesibilidad automatizada (WCAG con axe)
 *
 * Aquí empieza de verdad la parte de UX del taller.
 *
 * Los módulos 1 y 2 verifican que la interfaz FUNCIONE. Este verifica que
 * se pueda USAR: por alguien que navega con teclado, con lector de pantalla,
 * con baja visión o con daltonismo.
 *
 * Contexto de industria: la accesibilidad dejó de ser opcional. El European
 * Accessibility Act es exigible desde junio de 2025, y en Estados Unidos la
 * ADA genera litigio constante sobre sitios web.
 *
 * LÍMITE IMPORTANTE, y es lo más valioso de este módulo:
 * axe detecta de forma fiable alrededor del 40% de los problemas WCAG. Son
 * los mecánicos: contraste insuficiente, imágenes sin texto alternativo,
 * botones y enlaces sin nombre accesible.
 *
 * El resto exige juicio humano y NINGUNA herramienta lo automatiza:
 * ¿el texto alternativo describe la imagen o solo dice "imagen"? ¿el orden
 * de tabulación sigue el orden lógico de la tarea? ¿el mensaje de error
 * explica cómo corregir el problema?
 *
 * Una suite de axe en verde NO significa "el sitio es accesible".
 * Significa "no tiene los errores que una máquina puede detectar sola".
 *
 * Todo esto suena a advertencia genérica hasta que se mide. Eso hace el
 * módulo 3B (modulo3b-defectos-sembrados.spec.js): audita una página con 17
 * defectos deliberados y comprueba cuáles encuentra axe y cuáles no.
 */

test.describe('Módulo 3 — Accesibilidad (WCAG 2.1 AA)', () => {
  let registro;
  test.beforeEach(async ({ page }, testInfo) => { registro = new RegistroPage(page); await registro.abrir(); });

  test('01 - La página inicial no tiene violaciones detectables', async ({ page }, testInfo) => {

    const resultados = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Si falla, el mensaje muestra la regla, el impacto y el selector exacto.
    await testInfo.attach('axe-auditoria.json', { body: JSON.stringify(resultados, null, 2), contentType: 'application/json' });
    expect(
      resultados.violations,
      formatearViolaciones(resultados.violations)
    ).toEqual([]);
  });

  test('02 - La página con errores de validación sigue siendo accesible', async ({ page }, testInfo) => {
    // Los estados de error son el punto ciego clásico: se audita la página
    // "feliz" y se olvida cómo queda cuando algo sale mal.
    await registro.documento.fill('-5');
    await registro.botonRegistrar.click();
    await expect(registro.errores.documento).toBeVisible();

    const resultados = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    await testInfo.attach('axe-auditoria.json', { body: JSON.stringify(resultados, null, 2), contentType: 'application/json' });
    expect(
      resultados.violations,
      formatearViolaciones(resultados.violations)
    ).toEqual([]);
  });

  test('03 - El resultado de la inscripción se anuncia a lectores de pantalla', async ({ page }, testInfo) => {
    const documento = Math.floor(Math.random() * 900_000_000) + 100_000;

    await registro.nombre.fill('Ana Accesible');
    await registro.documento.fill(String(documento));
    await registro.edad.fill('30');
    await registro.botonRegistrar.click();

    // role="status" con aria-live="polite" hace que el lector de pantalla
    // lea el resultado sin que la persona tenga que ir a buscarlo.
    // Sin esto, alguien que no ve la pantalla no se entera de que pasó algo.
    const status = registro.resultado;
    await expect(status).toBeVisible();
    await expect(status).toContainText('Inscripción exitosa');
    await expect(status).toHaveAttribute('aria-live', 'polite');
    const auditoria = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    await testInfo.attach('axe-auditoria.json', { body: JSON.stringify(auditoria, null, 2), contentType: 'application/json' });
    expect(auditoria.violations, formatearViolaciones(auditoria.violations)).toEqual([]);
  });

  test('04 - Existe un enlace para saltar al contenido principal', async ({ page }, testInfo) => {
    // WCAG 2.4.1: quien navega con teclado no debería tener que tabular por
    // toda la cabecera en cada página. El enlace está oculto hasta recibir foco.
    await page.keyboard.press('Tab');

    const salto = registro.salto;
    await expect(salto).toBeFocused();
  });

  test('05 - Todos los campos tienen etiqueta asociada', async ({ page }, testInfo) => {

    // Un input sin <label for> es invisible para un lector de pantalla:
    // se anuncia como "cuadro de edición", sin decir de qué.
    const camposSinEtiqueta = await registro.camposSinEtiqueta();

    expect(camposSinEtiqueta).toEqual([]);
  });
});

/** Convierte las violaciones de axe en un mensaje legible al fallar. */
function formatearViolaciones(violaciones) {
  if (!violaciones.length) return 'Sin violaciones';
  return (
    '\n' +
    violaciones
      .map((v) => {
        const nodos = v.nodes.map((n) => '      ' + n.target.join(' ')).join('\n');
        return `  [${v.impact}] ${v.id}: ${v.help}\n    ${v.helpUrl}\n${nodos}`;
      })
      .join('\n\n')
  );
}
