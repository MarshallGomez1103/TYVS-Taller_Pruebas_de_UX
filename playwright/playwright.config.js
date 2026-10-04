// @ts-check
const path = require('node:path');
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuracion de Playwright para el taller.
 *
 * Lo importante aqui: webServer levanta la Registraduria automaticamente
 * antes de correr las pruebas y la apaga al terminar. Sin esto, el estudiante
 * tendria que acordarse de arrancar el servicio a mano, y olvidarlo es la
 * causa numero uno de "las pruebas fallan y no se por que".
 */
module.exports = defineConfig({
  testDir: './tests',

  // Falla el build si alguien deja un test.only olvidado en un commit.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  // Una referencia ausente debe fallar, no aprobarse automáticamente.
  updateSnapshots: 'none',
  reporter: [['html', { open: 'never' }], ['list'], ['json', { outputFile: 'test-results/resultados.json' }]],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080',
    // Captura evidencia solo cuando algo falla: util para diagnosticar en CI.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  webServer: {
    cwd: path.resolve(__dirname),
    command:
      'node scripts/servidor.js',
    url: 'http://localhost:8080/actuator/health',
    reuseExistingServer: process.env.REUSE_SERVER === 'true',
    timeout: 120 * 1000,
  },
});
