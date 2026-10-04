# Accesibilidad: auditoría y revisión asistida

## Medición ejecutada

Se ejecutó axe-core 4.13.0 con Chromium sobre el estado inicial, los errores de validación y una inscripción exitosa de `index.html`. Cada estado tuvo cero violaciones con el filtro `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`. Los JSON incluyen también comprobaciones que axe dejó para revisión; cero violaciones no certifica accesibilidad completa.

Sobre `/defectuosa.html`, el filtro reportó seis reglas; sin filtro aparecieron diez. Las cuatro adicionales son buenas prácticas de axe que ese filtro omite. Son reglas, no un conteo de nodos ni de participantes excluidos.

| Regla | Con filtro WCAG | Quién puede quedar excluido y por qué |
|---|---|---|
| button-name | Sí | Quien usa lector de pantalla no puede saber para qué sirve el botón de ayuda sin nombre. |
| color-contrast | Sí | Una persona con baja visión puede no distinguir la ayuda y el pie sobre su fondo. |
| html-has-lang | Sí | Un lector de pantalla no recibe el idioma del documento y puede pronunciar el español incorrectamente. |
| image-alt | Sí | Quien no ve la imagen pierde la información que esa imagen aporta. |
| link-name | Sí | Quien navega por la lista de enlaces no sabe el destino o propósito del enlace sin nombre. |
| select-name | Sí | El selector de género no comunica qué dato debe elegir quien usa lector de pantalla. |
| heading-order | No | Los saltos de encabezados dificultan reconstruir la jerarquía mediante un lector de pantalla. |
| landmark-one-main | No | Falta la región principal que permite saltar a la tarea sin recorrer toda la pantalla. |
| region | No | Parte del contenido queda fuera de regiones semánticas usadas para orientarse y navegar. |
| tabindex | No | El orden artificial de tabulación obliga a quien usa teclado a recorrer campos en una secuencia inesperada. |

### Regla priorizada del grupo B

Se prioriza **tabindex**: en la página defectuosa, Edad tiene índice 1, Documento 2 y Nombre 3, lo que fuerza un orden diferente del orden visual y de la tarea. Afecta directamente a quien navega con teclado. La ausencia de `<main>` también dificulta la orientación, pero el orden de tabulación altera cada recorrido de los campos. Esta elección es una priorización técnica de la entrega, no una medición de prevalencia.

## Grupo C: siete hallazgos de la revisión asistida

La revisión combinó asistencia de IA, inspección de los estados del navegador y su estructura, y consulta del material del profesor. El método fue una revisión asistida. Las comprobaciones de marcado no incluyen una sesión con lector de pantalla real. La evidencia está en [revision-asistida.json](../evidencias/revision-asistida.json) y en la captura siguiente.

![Página defectuosa después de una inscripción ficticia de revisión](../evidencias/revision-defectuosa.png)

| Defecto | Ubicación | Por qué axe no lo reportó aquí | Comprobación de la revisión asistida |
|---|---|---|---|
| Placeholder como única etiqueta | Campo Nombre completo | En esta ejecución el placeholder aportó nombre accesible; la regla no valoró la ausencia de una etiqueta visible persistente. Una comprobación propia sí detecta la falta de label. | El campo #d-nombre tiene cero labels antes y después de escribir; el placeholder es su único nombre visible antes de escribir. |
| Texto alternativo «imagen» | Segunda imagen del formulario | El atributo existe; juzgar si describe útilmente la imagen exige contexto. | La segunda imagen tiene literalmente alt="imagen"; no describe el logo. |
| Foco invisible | Campos, enlaces y botones enfocados | El estilo elimina outline; esta auditoría no recorrió y evaluó todos los estados de foco. Se debe navegar con teclado. | Al enfocar #d-nombre se midieron outline:none y box-shadow:none. |
| Casilla «Estado» | Casilla debajo de género | Tiene nombre accesible, pero su significado es ambiguo. Hay que comprobar si se entiende qué representa marcarla. | La etiqueta de #d-vivo contiene únicamente Estado. |
| Resultado sin anuncio | Mensaje tras inscribir | No se le informa al motor que ese cambio es una notificación que debe anunciarse; la ausencia de role/status y aria-live se comprueba aparte. | El resultado visible tiene role:null y aria-live:null. |
| Enlace «Haga clic aquí» | Enlace después del resultado | Es un nombre no vacío; su utilidad aislada y su contexto requieren revisión del propósito. | El enlace visible usa Haga clic aquí sin identificar el destino. |
| Error «Error.» | Mensaje al enviar datos inválidos | Detectar una frase no equivale a juzgar si orienta la corrección. | Al enviar documento negativo se obtuvo exactamente Error. |

La conclusión se limita a esta versión y configuración de axe. No afirma que ningún programa pudiera detectar jamás esos defectos: varios admiten reglas específicas o automatización parcial. La calidad del lenguaje y el contexto siguen necesitando juicio humano.

## Qué significan los siete problemas y cómo mejorarlos

| Problema | Qué le ocurre a la persona | Cambio propuesto |
|---|---|---|
| Nombre sin etiqueta permanente | Después de escribir, deja de ver qué dato pide el campo. | Mantener una etiqueta visible asociada al campo. |
| Descripción de imagen genérica | El lector de pantalla dice «imagen», pero no explica qué representa. | Describir el propósito del logo; si una imagen es decorativa, usar texto alternativo vacío. |
| Foco invisible | Al presionar Tab no sabe en qué campo o botón está. | Mostrar un contorno de foco claramente visible al usar teclado. |
| Casilla «Estado» | No sabe qué significa marcar o desmarcar. | Usar «¿La persona está viva?» con una indicación clara de la selección. |
| Confirmación sin anuncio | La confirmación aparece en pantalla, pero falta una región que comunique el cambio al lector de pantalla. | Anunciar la confirmación mediante una región de estado y verificarla con lector de pantalla. |
| Enlace «Haga clic aquí» | No sabe a dónde lo llevará el enlace, especialmente al escucharlo aislado. | Escribir un nombre que describa el destino o la acción. |
| Mensaje «Error.» | No sabe qué dato falló ni cómo corregirlo. | Explicar la causa y orientar al campo que debe corregir. |

Estos hallazgos están en la pantalla de entrenamiento `defectuosa.html`, que conserva los errores deliberados del profesor para que las pruebas puedan detectarlos. Las propuestas anteriores describen cómo mejorar una interfaz de uso real. La franja roja identifica la página de entrenamiento; el bajo contraste medido por axe está en los textos de ayuda y del pie.

## Informes guardados

- [Inicial](../evidencias/axe-inicial.json), [error](../evidencias/axe-error.json), [resultado](../evidencias/axe-resultado.json).
- [Defectuosa con filtro](../evidencias/axe-defectuosa-wcag.json), [sin filtro](../evidencias/axe-defectuosa-completa.json).
