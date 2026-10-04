# Gestión de defectos y mejoras

El registro completo está en [defectos.md](../../../defectos.md).

| ID | Hallazgo | Estado | Evidencia o siguiente paso |
|---|---|---|---|
| F-01 | Los decimales se truncaban antes de validar | Resuelto | Los casos 1.5 y 18.9 fallaron antes de la corrección y pasan después |
| UX-01 | Ayuda de edad excluía verbalmente a quien tiene 18 | Resuelto | Texto «18 años o más» e inscripción del valor límite |
| T-01 | Failsafe no cargaba las clases del JAR de Boot | Resuelto | Cuatro pruebas unitarias y una de integración en verde |
| UX-02 | Dificultad para identificar el foco | Abierto | Reportado por P1–P5; contrastar versión y navegador |
| UX-03 | Dificultad para distinguir o localizar mensajes | Abierto | Reportes de duplicados; contrastar percepción con el texto y la ubicación reales |
| UX-04 | Dudas sobre formato del documento | Abierto | P1 y P2; evaluar visibilidad de la ayuda y un ejemplo |

Los tres problemas de sesión son hallazgos reportados, no ausencias verificadas en el DOM. Se conserva la evidencia de cada participante y se proponen mejoras para una nueva validación. La página deliberadamente defectuosa se conserva como control del experimento, no se corrige hasta eliminar su propósito didáctico.
