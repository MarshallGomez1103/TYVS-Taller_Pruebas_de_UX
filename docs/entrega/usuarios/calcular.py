"""Calcula métricas desde observaciones reales completas; no genera participantes."""
import csv
import math
from pathlib import Path
from statistics import mean


def sus(respuestas):
    if len(respuestas) != 10 or any(type(x) is not int or not 1 <= x <= 5 for x in respuestas):
        raise ValueError('SUS necesita diez enteros entre 1 y 5.')
    return 2.5 * sum(x - 1 if i % 2 == 0 else 5 - x for i, x in enumerate(respuestas))


def calcular(carpeta):
    with (carpeta / 'tareas.csv').open(newline='') as f:
        tareas = list(csv.DictReader(f))
    with (carpeta / 'sus.csv').open(newline='') as f:
        cuestionarios = list(csv.DictReader(f))
    participantes = {f'P{i}' for i in range(1, 6)}
    claves = {(p, f'T{t}') for p in participantes for t in range(1, 5)}
    if len(tareas) != 20 or {(r['participante'], r['tarea']) for r in tareas} != claves:
        raise ValueError('Se requieren las cuatro tareas de cada uno de P1–P5, sin duplicados.')
    if len(cuestionarios) != 5 or {r['participante'] for r in cuestionarios} != participantes:
        raise ValueError('Se requiere un cuestionario SUS por cada participante P1–P5.')
    for r in tareas:
        if r['consentimiento'] != 'si':
            raise ValueError(f"Falta consentimiento afirmativo de {r['participante']}.")
        if any(r[c] not in ('si', 'no') for c in ('exito_sin_ayuda', 'abandono')):
            raise ValueError('Éxito y abandono deben registrarse con si/no.')
        r['segundos'] = float(r['segundos'])
        r['errores'] = int(r['errores'])
        if not math.isfinite(r['segundos']) or r['segundos'] <= 0 or r['errores'] < 0:
            raise ValueError('Tiempo positivo y número de errores no negativo requeridos.')
        if r['abandono'] == 'si' and r['exito_sin_ayuda'] == 'si':
            raise ValueError('Una tarea abandonada no puede tener éxito.')
    puntajes = {r['participante']: sus([int(r[f'q{i}']) for i in range(1, 11)]) for r in cuestionarios}
    lineas = ['# Resultados numéricos de la sesión', '', 'Datos introducidos por quien moderó; el script valida su formato, no verifica que las sesiones ocurrieran.', '',
              '| Tarea | Éxito sin ayuda | Tiempo medio reportado (s) | Tiempo medio en éxitos (s) | Errores | Abandono |',
              '|---|---|---|---|---|---|']
    for t in range(1, 5):
        filas = [r for r in tareas if r['tarea'] == f'T{t}']
        exitos = [r for r in filas if r['exito_sin_ayuda'] == 'si']
        tiempo_exitos = f"{mean(r['segundos'] for r in exitos):.1f}" if exitos else '—'
        lineas.append(f"| T{t} | {len(exitos)}/5 ({len(exitos)*20}%) | {mean(r['segundos'] for r in filas):.1f} | {tiempo_exitos} | {sum(r['errores'] for r in filas)} | {sum(r['abandono']=='si' for r in filas)}/5 |")
    lineas += ['', '| Participante | T1 éxito / s | T2 éxito / s | T3 éxito / s | T4 éxito / s | SUS |', '|---|---|---|---|---|---|']
    for p in sorted(participantes):
        celdas = [f"{r['exito_sin_ayuda']} / {r['segundos']:.1f}" for r in sorted(tareas, key=lambda r: r['tarea']) if r['participante'] == p]
        lineas.append('| ' + ' | '.join([p] + celdas + [f'{puntajes[p]:.1f}']) + ' |')
    lineas += ['', f"SUS promedio: **{mean(puntajes.values()):.1f}/100** (no es un porcentaje).", '', 'El análisis, los problemas priorizados y los límites de interpretación están en [Usabilidad](../wiki/Usabilidad.md).']
    return '\n'.join(lineas) + '\n'


if __name__ == '__main__':
    carpeta = Path(__file__).resolve().parent
    try:
        resultado = calcular(carpeta)
    except (ValueError, KeyError) as error:
        raise SystemExit(f'Sesión incompleta o datos inválidos: {error}')
    (carpeta / 'resultados.md').write_text(resultado)
    print(resultado)
