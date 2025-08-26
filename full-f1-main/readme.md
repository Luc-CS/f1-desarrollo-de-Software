# Fórmula 1: El Gran Premio de la Programación 🏎️

Una importante escudería de Fórmula 1 quiere modernizar su sistema de gestión de carreras. Luego de un relevamiento, surgieron los siguientes requerimientos que deben implementar en el paradigma de objetos.

## Punto 1) El Auto Perfecto
Todo auto de F1 tiene un número, marca, modelo, tipo de neumáticos, velocidad máxima y nivel de combustible. Hay cuatro tipos de autos según su estado:
- Los autos en carrera tienen un conductor asignado y un tiempo de vuelta actual
- Los autos en boxes están siendo reparados o con mantenimiento
- Los autos de reserva están disponibles para reemplazar a otros
- Los autos de desarrollo son usados para probar nuevas piezas

### Métodos a implementar:

1. `configurarDesgasteInicial(configuracion)`
   - Recibe un objeto con niveles iniciales de desgaste
   - Debe establecer los valores iniciales para neumáticos, combustible y motor
   - Validar que los valores estén entre 0 y 100

2. `estaEnCondicionesOptimas()`
   - Retorna true si:
     - Desgaste de neumáticos < 30%
     - Nivel de combustible > 20%
     - Desgaste del motor < 40%
     - Si está en carrera, debe tener conductor asignado

3. `cambiarNeumaticos(tipoNeumaticos)`
   - Recibe el tipo de neumáticos (blandos, medios, duros)
   - Actualiza el tipo y resetea el desgaste
   - Valida que el tipo sea válido

4. `repostarCombustible(cantidad)`
   - Recibe la cantidad a repostar
   - Actualiza el nivel de combustible
   - No puede superar el 100%

5. `instalarPiezaNueva(pieza)`
   - Recibe la pieza a instalar
   - Actualiza el estado del auto
   - Registra la pieza en el historial

6. `calcularDesgaste(vuelta)`
   - Recibe el número de vuelta
   - Calcula desgaste de neumáticos, motor y combustible
   - Considera la velocidad y condiciones de la vuelta

7. `realizarPitStop(tipoNeumaticos, combustible)`
   - Recibe tipo de neumáticos y cantidad de combustible
   - Ejecuta cambio de neumáticos y repostaje
   - Actualiza el estado del auto

8. `obtenerEstadisticasDesgaste()`
   - Retorna objeto con estadísticas actuales:
     - Desgaste de neumáticos
     - Nivel de combustible
     - Estado del motor

## Punto 2) El Piloto Ideal
Cada piloto tiene un nombre, nacionalidad y puntos en el campeonato. Sus habilidades se miden en:
- Velocidad (0-100)
- Consistencia (0-100)
- Agresividad (0-100)

### Métodos a implementar:

1. `establecerHabilidades(habilidades)`
   - Recibe objeto con valores de habilidades
   - Valida que los valores estén entre 0 y 100
   - Actualiza las estadísticas del piloto

2. `puedeConducirAuto(auto)`
   - Valida si el piloto puede conducir el auto
   - Verifica compatibilidad de habilidades
   - Retorna true/false

3. `conducirAuto(auto)`
   - Asigna el auto al piloto
   - Actualiza referencias en ambos objetos
   - Valida que el auto esté disponible

4. `calcularRendimiento(condiciones)`
   - Recibe condiciones de la carrera
   - Calcula rendimiento basado en habilidades
   - Considera adaptación a condiciones

5. `adaptarEstiloConduccion(condiciones)`
   - Ajusta estilo según condiciones
   - Modifica agresividad y consistencia
   - Actualiza estadísticas

6. `registrarVictoria()`
   - Incrementa contador de victorias
   - Actualiza puntos del campeonato
   - Registra en estadísticas

7. `registrarPodio(posicion)`
   - Registra posición en podio
   - Actualiza puntos según posición
   - Incrementa contador de podios

8. `registrarVueltaRapida()`
   - Incrementa contador de vueltas rápidas
   - Actualiza estadísticas
   - Registra en historial

9. `obtenerEstadisticas()`
   - Retorna objeto con todas las estadísticas:
     - Victorias, podios, vueltas rápidas
     - Puntos en campeonato
     - Habilidades actuales

## Punto 3) El Circuito Desafiante
Un circuito tiene nombre, ubicación y longitud en kilómetros. Incluye:
- Curvas (nombre, velocidad máxima, dificultad)
- Zonas DRS (nombre, longitud)
- Condiciones climáticas (clima, temperatura, humedad)
- Récord de vuelta

### Métodos a implementar:

1. `esDesafiante()`
   - Retorna true si:
     - Tiene más de 10 curvas
     - Al menos 2 zonas DRS
     - Longitud > 5km
     - Dificultad promedio alta

2. `agregarCurva(nombre, velocidadMaxima, dificultad)`
   - Agrega nueva curva al circuito
   - Valida parámetros
   - Actualiza estadísticas

3. `agregarZonaDRS(nombre, longitud)`
   - Agrega nueva zona DRS
   - Valida parámetros
   - Actualiza estadísticas

4. `establecerCondicionesClimaticas(clima, temperatura, humedad)`
   - Actualiza condiciones actuales
   - Valida rangos de valores
   - Notifica cambios

5. `actualizarRecordVuelta(tiempo, piloto)`
   - Actualiza récord si es mejor
   - Registra piloto y tiempo
   - Actualiza estadísticas

6. `obtenerEstadisticasCircuito()`
   - Retorna objeto con:
     - Número de curvas
     - Zonas DRS
     - Récords
     - Condiciones actuales

## Punto 4) La Carrera Perfecta
Una carrera tiene nombre, circuito y fecha. Incluye:
- Autos participantes
- Condiciones climáticas
- Clasificación (Q1, Q2, Q3)
- Resultados finales

### Métodos a implementar:

1. `iniciarCarrera()`
   - Valida requisitos mínimos
   - Establece condiciones iniciales
   - Prepara sistema de cronometraje

2. `esValida()`
   - Retorna true si:
     - Hay al menos 10 autos
     - Circuito es válido
     - Condiciones climáticas establecidas
     - Fecha es válida

3. `calcularNumeroVueltas()`
   - Calcula vueltas según:
     - Longitud del circuito
     - Duración objetivo
     - Consumo de combustible

4. `realizarClasificacion()`
   - Ejecuta Q1, Q2, Q3
   - Ordena pilotos por tiempo
   - Asigna posiciones de salida

5. `registrarVuelta(auto, tiempo)`
   - Registra tiempo de vuelta
   - Actualiza estadísticas
   - Verifica récords

6. `finalizarCarrera()`
   - Calcula resultados finales
   - Asigna puntos
   - Actualiza estadísticas

7. `obtenerResultados()`
   - Retorna objeto con:
     - Posiciones finales
     - Tiempos totales
     - Puntos asignados

## Punto 5) La Escudería Ganadora
Una escudería tiene nombre, país de origen y presupuesto. Gestiona:
- Autos y pilotos
- Desarrollo (motor, aerodinámica, neumáticos, suspensión)
- Estadísticas del equipo

### Métodos a implementar:

1. `invertirEnDesarrollo(area, monto)`
   - Valida presupuesto disponible
   - Actualiza nivel de desarrollo
   - Registra inversión

2. `calcularMejora(area, monto)`
   - Calcula mejora según inversión
   - Considera área de desarrollo
   - Retorna nivel de mejora

3. `esDesarrolloExitoso(area)`
   - Valida si el desarrollo fue exitoso
   - Considera nivel y presupuesto
   - Retorna true/false

4. `obtenerEstadisticas()`
   - Retorna objeto con:
     - Niveles de desarrollo
     - Presupuesto restante
     - Estadísticas del equipo

5. `actualizarEstadisticas(tipo, cantidad)`
   - Actualiza estadísticas específicas
   - Valida tipo y cantidad
   - Registra cambios

## Punto 6) La Estrategia Ganadora
Una estrategia define:
- Número de paradas
- Tipos de neumáticos
- Vueltas de parada
- Nivel de agresividad

### Métodos a implementar:

1. `esOptima()`
   - Valida si la estrategia es óptima
   - Considera número de paradas
   - Verifica distribución

2. `paradasDistribuidasUniformemente()`
   - Verifica distribución de paradas
   - Calcula intervalos
   - Retorna true/false

3. `agresividadConsistente()`
   - Valida nivel de agresividad
   - Verifica coherencia
   - Retorna true/false

4. `registrarParada(tiempo)`
   - Registra tiempo de parada
   - Actualiza contadores
   - Valida secuencia

5. `obtenerSiguienteParada()`
   - Retorna detalles de próxima parada
   - Incluye vuelta y neumáticos
   - Valida disponibilidad

## Requisitos Generales
1. Implementar todas las clases y métodos indicados
2. Agregar validaciones necesarias
3. Manejar casos de error
