# Plan de pruebas

## Alcance

El sistema es la Registraduría de Spring Boot, con formulario HTML/CSS/JavaScript y endpoint `POST /register`. Se evalúan reglas funcionales, mantenibilidad de las pruebas, accesibilidad, aspecto visual y comprensión de la interfaz.

| Técnica | Pregunta | Evidencia de la entrega |
|---|---|---|
| Playwright E2E | ¿El formulario y la API aplican las reglas? | 26 casos entre módulos 1 y 2 |
| Page Object | ¿Las acciones de pantalla están encapsuladas? | RegistroPage y DefectuosaPage |
| axe | ¿Qué errores mecánicos de accesibilidad aparecen? | Tres estados correctos y dos auditorías de la página defectuosa |
| Regresión visual | ¿Se detecta un cambio de apariencia? | Tres referencias y un experimento que falla con diff |
| Selenium | ¿Se reproduce el flujo desde Java? | Siete casos |
| Usabilidad | ¿Cómo perciben y completan las tareas cinco personas? | 20 respuestas de tarea y cinco cuestionarios SUS |

## Criterios de aceptación

- Al menos ocho escenarios funcionales y la regla de edad imposible comprobada también por API.
- Localizadores encapsulados y ninguna espera fija en los casos; esperas por condición.
- Datos independientes y creación del duplicado dentro de su propia prueba.
- Tres estados auditados y cero violaciones WCAG detectadas en la página correcta.
- Contraste con y sin filtro de axe y revisión de los siete defectos que no reportó.
- Tres referencias visuales, una móvil, y evidencia de una diferencia detectada sin aceptar automáticamente la nueva imagen.
- Cinco participantes, cuatro tareas, consentimiento anónimo, tiempos, errores y SUS.
- Defectos con pasos, severidad, estado y propuesta; CI con reportes como artefactos.

## Datos y límites

Las pruebas automáticas utilizan nombres y documentos ficticios. Las sesiones se identifican con P1–P5 y usan los rangos ficticios del guion. El servicio usa H2 en memoria: cada ejecución propia de Playwright inicia un proceso con estado nuevo.

Las respuestas de participantes son autorreportadas por texto. La revisión del grupo C fue asistida y con conocimiento previo del material; no acredita una búsqueda a ciegas. El módulo opcional de evaluación de IA se conserva como material exploratorio del profesor y no se presenta como ejecutado.
