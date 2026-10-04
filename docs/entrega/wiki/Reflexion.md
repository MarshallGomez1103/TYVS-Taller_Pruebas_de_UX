# Reflexión sobre UI, UX y accesibilidad

## Por qué importa diseñar para quien usa el sistema

Para mí, que el software funcione también implica que la persona pueda entenderlo y utilizarlo. Como programador conozco las reglas, el propósito de cada campo y lo que significa una respuesta del sistema. Una persona que llega por primera vez no tiene ese contexto: la interfaz debe guiarla, incluso si tiene poca experiencia con un celular o no sabe qué es un sistema operativo.

El ejemplo que uso es un niño con un iPad: puede aprender a interactuar sin conocer los detalles del sistema operativo, porque la interfaz ofrece señales y acciones que puede reconocer. Es una analogía para explicar mi idea, no una prueba realizada en este taller. Mi objetivo con UI/UX es reducir las barreras para personas con distintos conocimientos y necesidades, sin asumir que piensan como quien programó la aplicación.

La UI aporta etiquetas, contraste, controles y señales de foco. La UX también incluye comprender qué pasó, recuperarse de un error y completar la tarea con confianza. La accesibilidad amplía ese objetivo a quienes navegan con teclado, usan lectores de pantalla o necesitan mayor legibilidad.

## Lo que la automatización no explicó

Las pruebas funcionales confirmaron la inscripción y los rechazos esperados; la navegación con teclado también pasó. Sin embargo, los cinco participantes declararon dificultad para identificar el foco en T4. Todos completaron la tarea, pero esa experiencia no se resume en una aserción verde. La tarea de teclado tuvo el tiempo medio más alto, 47,4 s, y tres errores reportados.

Los mensajes son otro ejemplo: tener un texto y una región de estado no garantiza que la persona distinga un duplicado de un fallo técnico. La sesión autoadministrada aporta percepciones para revisar, no demuestra por sí sola que la interfaz carezca de instrucciones o indicadores.

## Lo que aportó axe

axe encontró seis reglas WCAG en la página defectuosa y diez reglas sin filtro. Entre ellas, un botón y un enlace sin nombre accesible, un selector sin etiqueta y la ausencia del idioma del documento. Pueden pasar inadvertidos al observar la apariencia, porque los elementos se dibujan aunque no se anuncien adecuadamente.

La comparación con y sin filtro mostró que una configuración puede ocultar buenas prácticas: jerarquía de encabezados, regiones principales y tabindex positivos. Además, un placeholder fue aceptado como nombre accesible, pero la comprobación específica encontró que no existía una etiqueta persistente. Por eso se combinaron auditoría automática y revisión asistida de los siete defectos del grupo C.

## Escritura y estabilidad de las pruebas

La estabilidad requirió controlar el estado del servidor, crear documentos independientes, esperar el resultado correcto y conservar referencias visuales revisadas. El caso de duplicados construye su propia primera inscripción; no depende de que otra prueba la haya creado. La comparación visual se mantuvo fuera de CI porque las fuentes y el sistema operativo afectan sus imágenes.

Los 26 casos E2E se repitieron dos veces en paralelo y pasaron las 52 ejecuciones. Además, un clon limpio pasó las 40 pruebas de Playwright sin crear el JAR a mano. Esa evidencia verifica condiciones concretas de reproducibilidad; no equivale a afirmar que nunca habrá una prueba inestable.

## Límite y siguiente validación

El SUS promedio de 78,5 es favorable según el baremo del taller, pero los tres problemas priorizados siguen abiertos. Conviene contrastar versiones y navegadores, comprobar la percepción del foco y la ayuda de formato, y repetir las tareas tras cualquier mejora. Las fechas exactas y los dispositivos de las cinco sesiones no se registraron, lo que limita la comparación.

Se utilizó IA para implementar, ejecutar verificaciones, calcular métricas desde las respuestas proporcionadas por Elioth y preparar documentación. Se conserva la atribución del material del profesor y la procedencia de las respuestas; no se presentan simulaciones como sesiones reales.
