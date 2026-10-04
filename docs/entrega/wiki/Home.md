# Taller de Pruebas de UI y UX

Esta Wiki documenta el plan, ejecución y evidencia del formulario de Registraduría. Se combinaron pruebas de navegador, Page Object, auditorías de accesibilidad, regresión visual y una evaluación autoadministrada con cinco participantes. El servicio es Spring Boot con H2 en memoria.

**Integrante:** Elioth Gomez. El punto de partida y los ejemplos didácticos corresponden al profesor César Augusto Vega Fernández; se conserva la licencia del repositorio.

## Objetivo

Comprobar que la interfaz aplica las reglas de inscripción y analizar si las personas entienden el flujo. Una prueba funcional correcta no garantiza que el resultado sea fácil de localizar o interpretar.

## Navegación

- [Plan de pruebas](Plan-de-pruebas.md)
- [Ejecución y evidencia](Ejecucion-y-evidencia.md)
- [Resultados técnicos y visuales](Resultados.md)
- [Accesibilidad](Accesibilidad.md)
- [Usabilidad con participantes](Usabilidad.md)
- [Gestión de defectos y mejoras](Gestion-de-defectos-y-mejoras.md)
- [Automatización CI/CD](Automatizacion-CI-CD.md)
- [Reflexión técnica](Reflexion.md)

## Resumen ejecutivo de evidencia

| Verificación | Resultado |
|---|---|
| Playwright completo local | 40 pruebas correctas |
| E2E repetidos en paralelo | 52 ejecuciones correctas |
| Java | 4 unitarias y 1 de integración correctas |
| Selenium | 7 pruebas correctas |
| axe sobre página correcta | 0 violaciones WCAG detectadas en tres estados |
| axe sobre página defectuosa | 6 reglas con filtro; 10 sin filtro |
| Capturas visuales | 3 referencias; una móvil; regresión controlada detectada |
| Evaluación de participantes | 5 personas; 20 éxitos y 0 abandonos reportados |
| SUS promedio | 78,5/100; rango bueno según el protocolo |

Los JSON y las respuestas anonimizadas se conservan en [docs/entrega](../LEEME.md). Las sesiones se registraron mediante respuestas en texto; fechas y versiones exactas no fueron aportadas. La revisión del grupo C fue asistida y no se presenta como búsqueda a ciegas. Cada sección distingue resultados medidos, autorreportados y propuestas pendientes de validar.
