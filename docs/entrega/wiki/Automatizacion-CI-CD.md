# Automatización CI/CD

El flujo está en [.github/workflows/ui-tests.yml](../../../.github/workflows/ui-tests.yml). Se activa en push, pull request y ejecución manual; cubre las ramas main, master y develop.

## Trabajo de Playwright

1. Configura JDK 17 y ejecuta `mvn clean verify`.
2. Configura Node 20 e instala los paquetes del lockfile con `npm ci`.
3. Instala Chromium y sus dependencias del runner.
4. Ejecuta E2E, Page Object, accesibilidad y defectos sembrados.
5. Adjunta el reporte HTML aunque una prueba falle.

## Trabajo de Selenium

Compila la aplicación, inicia el JAR, espera el endpoint de salud y ejecuta siete pruebas Java en modo headless. Adjunta los reportes Surefire incluso si falla una prueba.

## Criterio y límite

Un job fallido impide considerar la corrida correcta. Playwright permite un reintento en CI y conserva trazas cuando corresponde; una prueba que solo pasa al reintentar debe revisarse.

Las tres comparaciones visuales se verificaron localmente y están excluidas del runner remoto porque las fuentes difieren. No se actualizan referencias automáticamente en CI. La validación remota exacta se consulta en [Actions](https://github.com/MarshallGomez1103/TYVS-Taller_Pruebas_de_UX/actions).
