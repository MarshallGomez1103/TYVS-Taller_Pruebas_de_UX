# Ejecución y evidencia

## Preparación

Prerrequisitos: JDK 17, Maven y Node 20 o superior. Para abrir la aplicación manualmente consulte [Inicio rápido](../INICIO-RAPIDO.md). Compilar produce el JAR; ejecutar el JAR inicia el servicio; la página se abre manualmente en el navegador.

## Playwright

Desde el repositorio:

```bash
cd playwright
npm ci
npx playwright install chromium
npm test
npm run evidencia
npm run report
```

La configuración compila el JAR y arranca su propio servicio en 8080. El puerto debe estar libre; `REUSE_SERVER=true` permite reutilizar un servicio explícitamente. Las referencias no se crean automáticamente cuando faltan: la actualización es una acción aparte que requiere inspección.

## Java y Selenium

```bash
mvn -f registraduria/pom.xml clean verify
java -jar registraduria/target/registraduria-1.0-SNAPSHOT.jar
```

En otra terminal:

```bash
mvn -f selenium-java/pom.xml test -Dheadless=true
```

Selenium requiere la aplicación activa. Al terminar el servicio manual se detiene con Ctrl+C. Los siete casos locales usaron Chromium y ChromeDriver coincidentes.

## Artefactos

| Evidencia | Ubicación |
|---|---|
| Resultados de 40 pruebas y clon limpio | docs/entrega/evidencias/pruebas-resumen.json y clon-limpio-resumen.json |
| Independencia: 52 ejecuciones | docs/entrega/evidencias/independencia-resumen.json |
| Auditorías axe | docs/entrega/evidencias/axe-*.json |
| Revisión asistida | docs/entrega/evidencias/revision-asistida.json |
| Referencias y regresión | playwright/tests/modulo4-visual.spec.js-snapshots/ y docs/entrega/evidencias/regresion-*.png |
| Sesiones y cálculo SUS | docs/entrega/usuarios/ |

Los reportes HTML completos se regeneran localmente o se descargan como artefactos de Actions. No se versionan node_modules, target ni reportes temporales.
