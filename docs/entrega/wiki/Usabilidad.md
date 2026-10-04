# Usabilidad con cinco participantes

## Método y procedencia

Se recibieron respuestas de P1–P5 con cuatro tareas, tiempo por tarea, errores, abandono y diez respuestas SUS. Elioth confirmó que las cinco personas probaron la aplicación y dieron consentimiento para usar sus datos de forma anónima. Las tareas se enviaron por WhatsApp y los resultados se devolvieron por texto; son **autorreportados**, sin observación directa del asistente.

El [guion](../usuarios/guion.md) plantea objetivos sin explicar cómo completar el formulario. En T2 el éxito consiste en entender el rechazo por edad, y en T3 en entender el rechazo del duplicado. Una inscripción rechazada en esas tareas es el resultado esperado.

La [procedencia](../usuarios/procedencia.md), las [respuestas originales](../usuarios/respuestas-originales.md), [tareas.csv](../usuarios/tareas.csv) y [sus.csv](../usuarios/sus.csv) conservan el registro. No se aportaron fecha exacta de cada sesión, perfiles de participantes ni versión/navegador utilizados; no se asignan valores supuestos.

## Resultados por tarea

| Tarea | Éxito sin ayuda reportado | Tiempo medio | Errores totales | Abandono |
|---|---:|---:|---:|---:|
| T1 — Adulto vivo | 5/5 (100%) | 35,0 s | 1 | 0/5 |
| T2 — Menor de edad | 5/5 (100%) | 25,0 s | 0 | 0/5 |
| T3 — Documento duplicado | 5/5 (100%) | 21,4 s | 0 | 0/5 |
| T4 — Solo teclado | 5/5 (100%) | 47,4 s | 3 | 0/5 |

Son 20 tareas con éxito reportado, cuatro errores reportados y ningún abandono. El 100% describe estas respuestas; no garantiza que todas las personas de una población completarían el formulario.

## Resultados por participante

En las cuatro tareas todos declararon éxito sin ayuda. La tabla muestra los segundos reportados y el cálculo individual de SUS.

| Participante | T1 | T2 | T3 | T4 | SUS |
|---|---:|---:|---:|---:|---:|
| P1 | 35 | 25 | 20 | 42 | 82,5 |
| P2 | 40 | 22 | 18 | 45 | 80,0 |
| P3 | 30 | 28 | 22 | 50 | 77,5 |
| P4 | 32 | 24 | 26 | 48 | 75,0 |
| P5 | 38 | 26 | 21 | 52 | 77,5 |

## SUS e interpretación

Para las afirmaciones impares se calcula respuesta − 1; para las pares, 5 − respuesta. La suma se multiplica por 2,5. Por ejemplo, P1 obtiene una suma ajustada de 33 y un puntaje de 82,5.

**SUS promedio: 78,5/100.** No es un porcentaje ni significa «78,5% de usabilidad». Según el baremo del [protocolo del taller](../../protocolo-pruebas-con-usuarios.md), se sitúa en el rango bueno, por encima de la referencia de 68. La valoración global favorable convive con dificultades concretas; no implica ausencia de problemas.

## Tres problemas priorizados

| ID | Problema reportado | Evidencia | Severidad propuesta | Cambio propuesto |
|---|---|---|---|---|
| UX-02 | Cuesta identificar el foco al usar teclado | P1–P5 lo mencionan en T4; T4 tiene 3 errores y tarda 47,4 s de media | Media: hay fricción en un modo esencial de interacción, aunque todos terminaron | Evaluar un indicador más distinguible y verificarlo en los navegadores de los participantes; comprobar la localización del resultado tras enviar |
| UX-03 | Cuesta distinguir o localizar los mensajes de rechazo | P1–P5 relatan dificultad para interpretar rápidamente el duplicado; P3 también cuestiona el detalle de edad | Media: exige lectura adicional para comprender la respuesta de negocio | Reforzar jerarquía de título y detalle, asociar el duplicado al documento y probar la lectura de los mensajes sin confundirlos con un fallo de conexión |
| UX-04 | Dudas sobre el formato del documento | P1 no sabía si incluir separadores; P2 reportó un error de formato y una corrección | Baja: dos relatos de fricción y un error reportado, sin abandono | Hacer más visible la ayuda existente, añadir un ejemplo y evaluar normalización de separadores antes de cambiar la validación |

Estas severidades son una priorización técnica basada en las respuestas. No se presentan como evaluaciones independientes del participante. Los tres hallazgos quedan abiertos para contrastar el problema y el cambio en una segunda sesión.

## Contraste con la interfaz y límites

La interfaz ya incluye «Solo números, sin puntos ni comas», el rechazo por edad ya dice «18 años o más», el resultado está después del formulario y el foco tiene un outline de 3 px. Por eso no se afirma como defecto comprobado que esos elementos falten. Los relatos indican que algunas personas no los percibieron o no los interpretaron como se esperaba; también puede haber diferencias de versión o navegador que no se registraron.

La navegación solo con teclado tardó 12,4 s más de media que T1. No puede atribuirse toda esa diferencia al foco: no se controlaron aprendizaje, dispositivo ni navegador. Con cinco participantes y un cuestionario autoadministrado, las conclusiones son de este taller y sirven para priorizar verificaciones, no para certificar la usabilidad general del sistema.

## Reproducción del cálculo

Desde la raíz del repositorio:

```bash
python3 docs/entrega/usuarios/calcular.py
```

El archivo generado [resultados.md](../usuarios/resultados.md) coincide con las tablas anteriores. El cálculo valida las celdas, no verifica de forma independiente la ejecución de cada sesión.
