# Registro de defectos de la entrega

Hallazgos técnicos reproducidos sobre la aplicación del taller. No proceden de sesiones con participantes.

## F-01 — Los decimales se truncaban antes de validar

- **Tipo:** funcional.
- **Módulo:** 2, E2E con Page Object.
- **Detección:** prueba de documento `1.5` y edad `18.9` en Chromium.
- **Pasos:** abrir el formulario, completar los campos con datos ficticios válidos y cambiar el documento a `1.5`; repetir con un documento nuevo y edad `18.9`; enviar.
- **Esperado:** rechazar el dato no entero y conservarlo para corregirlo, sin llamar a `/register`.
- **Obtenido antes:** `parseInt` convertía `1.5` en `1` y `18.9` en `18`; ambos podían inscribirse con datos distintos de los escritos.
- **Severidad:** alta, altera el documento o la edad enviados.
- **Corrección:** convertir con `Number`, conservar los decimales y rechazarlos con `Number.isInteger`; el campo vacío se convierte en `NaN`.
- **Validación:** las dos pruebas fallaron antes del cambio y pasan después; también comprueban que no hay petición al servicio.
- **Estado:** resuelto.

## UX-01 — El texto excluía verbalmente a quien tiene 18 años

- **Tipo:** usabilidad, inconsistencia entre instrucciones y comportamiento.
- **Módulo:** inspección del texto y prueba E2E del valor límite.
- **Detección:** revisión técnica asistida; impacto en usuarios pendiente de observar.
- **Pasos:** leer la ayuda de Edad: «Debe ser mayor de 18 años para votar»; inscribir una persona de exactamente 18 años.
- **Esperado:** comunicar la regla real, que admite los 18 años.
- **Obtenido antes:** la ayuda sugería más de 18, mientras la inscripción de 18 terminaba con éxito.
- **Severidad:** media, puede inducir a una persona habilitada a desistir; esto es un riesgo inferido, no una observación de participantes.
- **Corrección:** «Debe tener 18 años o más para votar».
- **Validación:** prueba que verifica el texto y completa la inscripción con 18 años.
- **Estado:** resuelto.

## T-01 — La prueba Java de integración no cargaba la aplicación

- **Tipo:** defecto de infraestructura de pruebas.
- **Detección:** `mvn verify` con JDK 17.
- **Obtenido:** Failsafe intentaba cargar las clases desde el JAR ejecutable de Boot, donde están anidadas bajo `BOOT-INF/classes`.
- **Corrección:** indicar `target/classes` mediante `classesDirectory`, usar la configuración real de la aplicación y aserciones de JUnit.
- **Estado:** resuelto; confirmado con `mvn clean verify` (4 pruebas unitarias y 1 de integración, sin fallos ni omisiones).

| ID | Tipo | Estado | Evidencia |
|---|---|---|---|
| F-01 | Funcional | Resuelto | Casos de decimales en módulo 2; resumen antes/después |
| UX-01 | Usabilidad | Resuelto | Caso de ayuda y límite de 18 años en módulo 2 |
| T-01 | Infraestructura de pruebas | Resuelto | Reportes Surefire y Failsafe |

Los defectos de `/defectuosa.html` son deliberados y se conservan para el experimento de accesibilidad. Los tres problemas reportados en la evaluación con participantes se registran a continuación.

## UX-02 — Dificultad reportada para identificar el foco

- **Tipo:** accesibilidad/usabilidad percibida.
- **Detección:** P1–P5 en T4; respuestas autorreportadas.
- **Esperado:** ubicar claramente el control activo y encontrar el resultado sin usar ratón.
- **Reportado:** duda sobre el campo o botón enfocado. T4 tuvo tres errores y 47,4 s de media, con éxito en los cinco casos.
- **Severidad:** media, fricción en un modo esencial de navegación; sin abandono reportado.
- **Cambio propuesto:** contrastar versión y navegador, probar un indicador más distinguible y comprobar la localización del resultado.
- **Estado:** abierto. La página ya tiene outline de 3 px; no se acredita ausencia del indicador en esta versión.

## UX-03 — Dificultad reportada para distinguir y localizar el rechazo

- **Tipo:** usabilidad.
- **Detección:** los cinco relatos de T3; además, percepciones de mensajes en T2.
- **Esperado:** reconocer de inmediato la regla que produjo el rechazo y la acción posible.
- **Reportado:** lectura adicional o confusión entre duplicado y fallo técnico, pese a completar la tarea.
- **Severidad:** media.
- **Cambio propuesto:** reforzar jerarquía de título y detalle, asociar el duplicado al documento y verificar la comprensión.
- **Estado:** abierto. El texto de edad ya dice 18 años o más y el resultado está después del formulario; las discrepancias se conservan como percepciones, no como ausencias verificadas.

## UX-04 — Dudas sobre el formato del documento

- **Tipo:** usabilidad.
- **Detección:** P1 y P2 en T1; P2 reportó un error y posterior éxito.
- **Esperado:** reconocer el formato aceptado antes de enviar.
- **Reportado:** duda por separadores o espacio en el documento.
- **Severidad:** baja, fricción corregida sin abandono.
- **Cambio propuesto:** destacar la ayuda existente y un ejemplo; evaluar normalización antes de cambiar la regla.
- **Estado:** abierto. La ayuda Solo números, sin puntos ni comas ya existe en la página.

Las respuestas y las métricas de estos hallazgos se conservan en [Usabilidad](docs/entrega/wiki/Usabilidad.md). No se han aplicado cambios adicionales a la interfaz a partir de percepciones sin contrastar.
