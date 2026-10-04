// Compila también en un clon limpio: el JAR no se versiona.
const { spawn } = require('node:child_process');
const path = require('node:path');
const cwd = path.resolve(__dirname, '../../registraduria');
let proceso;
let cerrando = false;
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    cerrando = true;
    if (proceso && proceso.exitCode === null) proceso.kill(signal);
  });
}
const args = ['-B', '-DskipTests', 'package'];
if (process.env.MAVEN_OFFLINE === 'true') args.unshift('-o');
proceso = spawn(process.platform === 'win32' ? 'mvn.cmd' : 'mvn', args, { cwd, stdio: 'inherit' });
proceso.on('error', error => { console.error(error.message); process.exitCode = 1; });
proceso.on('exit', code => {
  if (cerrando || code !== 0) { process.exitCode = code || 1; return; }
  const java = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', 'java') : 'java';
  proceso = spawn(java, ['-jar', 'target/registraduria-1.0-SNAPSHOT.jar'], { cwd, stdio: 'inherit' });
  proceso.on('error', error => { console.error(error.message); process.exitCode = 1; });
  proceso.on('exit', code => { process.exitCode = cerrando ? 0 : (code || 1); });
});
