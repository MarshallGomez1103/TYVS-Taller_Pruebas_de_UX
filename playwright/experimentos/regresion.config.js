const path = require('node:path');
const base = require('../playwright.config');
module.exports = {
  ...base,
  testDir: __dirname,
  testMatch: 'regresion.spec.js',
  retries: 0,
  webServer: { ...base.webServer, cwd: path.resolve(__dirname, '..') },
  outputDir: '../test-results-regresion',
  reporter: [['list'], ['html', { outputFolder: '../playwright-report-regresion', open: 'never' }], ['json', { outputFile: '../test-results-regresion/resultados.json' }]],
  snapshotPathTemplate: path.resolve(__dirname, '../tests/modulo4-visual.spec.js-snapshots/{arg}-{projectName}-{platform}{ext}'),
};
