# Entrega de Elioth Gomez

El repositorio contiene la implementación, las pruebas, las referencias visuales y la evidencia del taller. La documentación principal está organizada en la [Wiki](wiki/Home.md), siguiendo el estilo de la Wiki de pruebas de carga.

## Resultado

- 40 pruebas Playwright, 7 Selenium, 4 unitarias Java y 1 de integración correctas.
- Clon limpio verificado y 52 ejecuciones E2E repetidas en paralelo.
- axe en tres estados; comparación de seis reglas con filtro y diez sin filtro en la página defectuosa.
- Revisión asistida de los siete defectos no reportados por axe, con JSON y captura.
- Tres referencias Linux y un cambio visual deliberado que generó un diff, seguido de una corrida normal correcta.
- Respuestas de cinco participantes con consentimiento confirmado por Elioth: 20 éxitos reportados, ningún abandono y SUS promedio 78,5.
- Dos defectos del producto corregidos; tres hallazgos de usabilidad priorizados y abiertos para contrastar y validar una mejora.

## Ejecutar

Prerrequisitos: JDK 17, Maven y Node 20 o superior. La primera instalación necesita internet; los comandos posteriores pueden usar la caché.

```bash
cd playwright
npm ci
npx playwright install chromium
npm test
npm run evidencia
```

Playwright compila el JAR y arranca su propio servicio en 8080. Deje el puerto libre o use `REUSE_SERVER=true` para reutilizar una instancia explícitamente. La [guía de inicio rápido](INICIO-RAPIDO.md) explica cómo abrir el formulario manualmente. En el equipo de Elioth, el JDK 17 instalado está en `$HOME/.jdks/ms-17.0.20`.

Java: `mvn -f registraduria/pom.xml clean verify`. Selenium necesita el JAR ejecutándose y se inicia con `mvn -f selenium-java/pom.xml test -Dheadless=true`.

## Evidencia y límites

Los resultados numéricos están en [evidencias](evidencias/) y la [evaluación de participantes](wiki/Usabilidad.md). Los tiempos y errores fueron autorreportados; las fechas exactas, versiones y navegadores de las sesiones no se aportaron. Se conservaron los relatos aun cuando no coinciden literalmente con el texto de la interfaz.

La revisión de accesibilidad fue asistida, con consulta previa del material y comprobaciones del navegador y su estructura. Su método se documenta en Accesibilidad; no incluyó una sesión con lector de pantalla real. Las referencias visuales se verificaron en Linux; las originales de Windows no se revalidaron tras el cambio de texto. CI excluye el módulo visual por las diferencias de fuentes.

`npm run test:regresion:demo`, desde playwright, provoca una cabecera roja únicamente en su contexto y debe fallar con diff. No modifica el CSS del repositorio y no forma parte de la suite normal.

El material base y su licencia son del profesor César Augusto Vega Fernández. Se utilizó IA para implementar, verificar, calcular desde las respuestas suministradas y documentar el trabajo. El módulo opcional de evaluación de IA se conserva sin presentarlo como experimento ejecutado.

## Explicación breve

«Para mí, que el software funcione también significa que la persona pueda entenderlo y utilizarlo. Como programador ya sé cómo funciona, pero la interfaz debe guiar a alguien que llega por primera vez y tiene poca experiencia con la tecnología. Es como el ejemplo de un niño con un iPad: no necesita conocer el sistema operativo para reconocer las acciones que la pantalla le ofrece.

En este taller, Java aplica las reglas de inscripción y Playwright/Selenium comprueban el formulario desde el navegador. Corregimos el truncamiento de decimales y la ayuda ambigua de los 18 años. Las cinco personas reportaron completar las tareas y el SUS promedio fue 78,5, aunque señalaron dificultades con el foco, los mensajes y el formato del documento.

Los siete hallazgos de la pantalla defectuosa muestran por qué también importan las etiquetas permanentes, las descripciones de imágenes, un foco visible, las casillas claras, las confirmaciones accesibles, los enlaces descriptivos y los errores que explican cómo corregir. La misión de UI/UX es reducir las barreras para personas con diferentes conocimientos y necesidades; por eso combinamos pruebas técnicas con la experiencia de quienes usan la aplicación.»
