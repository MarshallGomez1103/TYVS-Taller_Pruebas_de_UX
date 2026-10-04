# Abrir el formulario en el equipo de Elioth

**Compilar, arrancar y abrir el navegador son tres pasos diferentes.** `BUILD SUCCESS` confirma la compilación; no abre una ventana ni deja el servidor ejecutándose.

## 1. Compilar

Abra una terminal y ejecute:

```bash
cd "/home/marshall/Desktop/5to/Disenio y Arq de Soft/2nd Cut/TYVS-Taller_Pruebas_de_UX"
export JAVA_HOME="$HOME/.jdks/ms-17.0.20"
mvn -f registraduria/pom.xml -DskipTests package
```

Debe terminar con `BUILD SUCCESS`.

## 2. Arrancar el servicio

En esa misma terminal:

```bash
"$JAVA_HOME/bin/java" -jar registraduria/target/registraduria-1.0-SNAPSHOT.jar
```

Espere a los mensajes `Tomcat started on port(s): 8080` y `Started RegistryApplication`. Deje esa terminal abierta. **Ctrl+C detiene la aplicación.** Si ya tiene una instancia funcionando en ese puerto, use esa instancia.

## 3. Abrir la pantalla

Abra [http://localhost:8080](http://localhost:8080) en su navegador. Debe aparecer «Inscripción de votantes». La página no se abre automáticamente al arrancar Java.

Al terminar, vuelva a la terminal del servicio y pulse Ctrl+C. Para ejecutar las pruebas automáticas, detenga primero este servicio: Playwright arranca y detiene el suyo.

En el IDE el archivo que inicia la aplicación es `registraduria/src/main/java/edu/unisabana/tyvs/registry/RegistryApplication.java`; el proyecto usa JDK 17. Las carpetas `application/usecase` e `infrastructure` contienen lógica y persistencia, no la clase de arranque.
