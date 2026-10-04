# Sesión de usabilidad — pendiente de ejecutar

Cinco participantes ajenos al desarrollo, identificados solo como P1–P5. Use exclusivamente las personas y documentos ficticios de esta hoja. No recopile nombres, cédulas reales, correo ni grabaciones si no hacen falta.

## Preparación

Levante la aplicación: `cd registraduria` y `mvn -DskipTests package`, luego `java -jar target/registraduria-1.0-SNAPSHOT.jar`. Abra http://localhost:8080. No ejecute la suite al mismo tiempo: Playwright usa el mismo puerto y reinicia su propia aplicación.

## Apertura y consentimiento

Lea: «Vamos a evaluar el formulario, no a ti. Durará aproximadamente 10–15 minutos. Te pediré pensar en voz alta. Registraré de forma anónima si completas cada tarea, el tiempo, los errores y tus respuestas a un cuestionario. Puedes detenerte cuando quieras. ¿Aceptas participar y que esos datos anónimos se usen en esta entrega académica?»

Registre `si` en la hoja solo después de la respuesta afirmativa. Si no acepta, no registre tareas ni SUS y reclute otra persona. El consentimiento para una eventual grabación debe pedirse por separado; esta sesión no requiere grabar.

## Tareas exactas

Para cada participante use un bloque diferente de documentos ficticios: P1 1500000001–1500000003, P2 1500000011–1500000013, P3 1500000021–1500000023, P4 1500000031–1500000033 y P5 1500000041–1500000043.

1. «Inscribe a Persona Adulta, de 30 años y viva, con el primer documento de tu bloque, para que pueda votar.»
2. «Persona Joven tiene 16 años, está viva y usa el segundo documento de tu bloque. Intenta inscribirla y explica qué pasó y por qué.»
3. «Intenta inscribir nuevamente a Persona Adulta con los mismos datos de la primera tarea. Explica qué significa el resultado.»
4. «Sin usar el ratón, inscribe a Persona Teclado, de 33 años y viva, con el tercer documento de tu bloque.»

No señale campos ni botones. Inicie el cronómetro al terminar de leer la tarea; deténgalo cuando la persona termine y explique el resultado, o abandone. Puede dar hasta 180 segundos por tarea; regístrelo como abandono al alcanzar el límite y conserve el tiempo observado. La tarea 2 y la 3 tienen éxito cuando la persona entiende el rechazo, aunque el registro no se acepte.

## Registro

En `tareas.csv`, use `si`/`no` en éxito y abandono; anote segundos, número de errores y observaciones concretas. Si hubo ayuda del moderador, el éxito sin ayuda es `no`; describa la intervención. No cambie las métricas para hacer que una sesión parezca mejor.

Al finalizar, lea las diez afirmaciones SUS del [protocolo original](../../protocolo-pruebas-con-usuarios.md), sin alterar su orden o redacción. Cada respuesta va de 1 a 5. Registre las diez en `sus.csv`.

El cálculo está preparado en `python3 docs/entrega/usuarios/calcular.py`. Con las hojas vacías mostrará que faltan datos. Cuando estén completas exportará tablas numéricas a `resultados.md`; las interpretaciones y los tres problemas observados los escribe el estudiante.

## Cierre pendiente

Seleccione tres problemas realmente observados y explique: comportamiento, expectativa, resultado, severidad y cambio propuesto. Responda qué problema no cubrió la automatización. No use los ejemplos del profesor como si fueran resultados de estas cinco personas.
