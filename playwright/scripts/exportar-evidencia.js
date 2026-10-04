// Conserva evidencia pequeña y portable; los reportes completos quedan como artefactos.
const fs = require('node:fs');
const path = require('node:path');
const raiz = path.resolve(__dirname, '../..');
const carpeta = path.join(raiz, 'docs/entrega/evidencias');
const informe = JSON.parse(fs.readFileSync(path.join(raiz, 'playwright/test-results/resultados.json'), 'utf8'));
fs.mkdirSync(carpeta, { recursive: true });
const casos = [];
function visitar(suite) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests) {
      casos.push({ archivo: spec.file, titulo: spec.title, estado: test.status,
        intentos: test.results.map(r => ({ estado: r.status, duracionMs: r.duration })) });
      for (const result of test.results) {
        for (const adjunto of result.attachments || []) {
          if (adjunto.name !== 'axe-auditoria.json') continue;
          const original = JSON.parse(adjunto.path ? fs.readFileSync(adjunto.path, 'utf8') : Buffer.from(adjunto.body, 'base64').toString('utf8'));
          let nombre;
          if (spec.file.includes('modulo3b')) nombre = spec.title.startsWith('01') ? 'defectuosa-wcag' : 'defectuosa-completa';
          else nombre = spec.title.startsWith('01') ? 'inicial' : spec.title.startsWith('02') ? 'error' : 'resultado';
          fs.writeFileSync(path.join(carpeta, `axe-${nombre}.json`), JSON.stringify({
            motor: original.testEngine, entorno: original.testEnvironment,
            fechaUTC: original.timestamp, url: original.url,
            violaciones: original.violations,
            requiereRevision: original.incomplete,
            reglasQuePasaron: original.passes.map(r => r.id),
          }, null, 2) + '\n');
        }
      }
    }
  }
  for (const sub of suite.suites || []) visitar(sub);
}
for (const suite of informe.suites) visitar(suite);
fs.writeFileSync(path.join(carpeta, 'pruebas-resumen.json'), JSON.stringify({ estadisticas: informe.stats, casos }, null, 2) + '\n');
console.log(`Exportados ${casos.length} casos y los informes axe a docs/entrega/evidencias.`);
if (informe.stats.unexpected || informe.stats.flaky || informe.stats.skipped || informe.errors?.length) {
  console.error('La corrida incluye fallos, inestabilidad, omisiones o errores: revise el resumen.');
  process.exitCode = 1;
}
