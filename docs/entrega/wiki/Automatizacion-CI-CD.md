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

## Ejecución remota verificada

El 4 de octubre de 2026, a las 01:22 en Bogotá, terminó correctamente la [corrida 37182538317](https://github.com/MarshallGomez1103/TYVS-Taller_Pruebas_de_UX/actions/runs/37182538317) sobre el commit `b3f1142a06c23b575567ebec3248e4c7808d05c4`. Se inició manualmente con `workflow_dispatch`; el workflow conserva los eventos push y pull request.

| Verificación en GitHub | Resultado |
|---|---|
| Playwright | 37 pruebas correctas, sin casos flaky reportados |
| Java unitario | 4 pruebas correctas |
| Java integración | 1 prueba correcta |
| Selenium | 7 pruebas correctas |
| Artefactos | playwright-report y selenium-surefire-reports publicados |

Las 3 capturas visuales completan las 40 pruebas locales y están excluidas de esta corrida remota. Los artefactos tienen retención de 7 días; los resúmenes y capturas locales permanecen versionados en el repositorio.
