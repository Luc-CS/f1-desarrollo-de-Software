class Piloto {
    constructor(nombre, nacionalidad, puntosCampeonato) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.puntosCampeonato = puntosCampeonato;
        this.estilo = 'agresivo'; // agresivo, conservador, desarrollo
        this.habilidad = 0;
        this.autosConducidos = [];
        this.victorias = 0;
        this.podios = 0;
        this.vueltasRapidas = 0;
        this.adelantamientos = 0;
        this.errores = 0;
        this.auto = null;
        this.habilidades = {
            velocidad: 0,
            consistencia: 0,
            agresividad: 0
        };
        this.estadisticas = {
            victorias: 0,
            podios: 0,
            vueltasRapidas: 0,
            abandonos: 0
        };
    }
    factorPiloto(){
        let nivelPiloto = (this.velocidad + this.consistencia) / 200;
        let retorno =1 - (nivelPiloto * 0.1);
        return retorno;
    }

    /**
     * Establece las habilidades del piloto
     * @param {Object} habilidades - Objeto con valores de habilidades (0-100)
     * @param {number} habilidades.velocidad - Nivel de velocidad
     * @param {number} habilidades.consistencia - Nivel de consistencia
     * @param {number} habilidades.agresividad - Nivel de agresividad
     * @returns {Object} Habilidades actualizadas
     * @throws {Error} Si algún valor está fuera del rango 0-100
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const habilidades = piloto.establecerHabilidades({
     *   velocidad: 95,
     *   consistencia: 90,
     *   agresividad: 85
     * });
     * // Returns: {
     * //   velocidad: 95,
     * //   consistencia: 90,
     * //   agresividad: 85,
     * //   nivelTotal: 90
     * // }
     */
    establecerHabilidades(habilidades) {
        if (habilidades.velocidad < 0 || habilidades.velocidad > 100 ||
            habilidades.consistencia < 0 || habilidades.consistencia > 100 ||
            habilidades.agresividad < 0 || habilidades.agresividad > 100) {
            throw new Error("Los valores de las habilidades deben estar entre 0 y 100.");
        }
        
        // Asignación de valores
        this.habilidades.velocidad = habilidades.velocidad;
        this.habilidades.consistencia = habilidades.consistencia;
        this.habilidades.agresividad = habilidades.agresividad;

        // Retornar las habilidades actualizadas (incluyendo el cálculo de nivelTotal)
        const nivelTotal = (habilidades.velocidad + habilidades.consistencia + habilidades.agresividad) / 3;
        
        return {
            ...this.habilidades, // Copia las propiedades existentes
            nivelTotal: nivelTotal // Agrega la nueva propiedad
        };
    }

    /**
     * Valida si el piloto puede conducir un auto específico
     * @param {Object} auto - Auto a validar
     * @returns {boolean} true si:
     * - El piloto tiene las habilidades necesarias
     * - El auto está disponible
     * - La compatibilidad es adecuada
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const puedeConducir = piloto.puedeConducirAuto(auto);
     * // Returns: true si cumple con los requisitos
     */
    puedeConducirAuto(auto) {
        // 1. Verificar si el auto está disponible
        const autoDisponible = (auto.estado === 'reserva' || auto.estado === 'en_boxes') && auto.conductor === null;
        
        // 2. Verificar la compatibilidad de habilidades
        // En este ejemplo, asumimos que un auto de desarrollo requiere un piloto con alta
        // consistencia (>= 80) y que los autos en carrera o boxes requieren alta velocidad
        // y consistencia.
        let compatibilidadHabilidades = false;
        if (auto.estado === 'desarrollo' && this.habilidades.consistencia >= 80) {
            compatibilidadHabilidades = true;
        } else if ((auto.estado === 'en_carrera' || auto.estado === 'en_boxes') && this.habilidades.velocidad >= 70 && this.habilidades.consistencia >= 70) {
            compatibilidadHabilidades = true;
        } else if (auto.estado === 'reserva') {
            // Un auto de reserva puede ser conducido por cualquier piloto
            compatibilidadHabilidades = true;
        }

        // 3. Retornar true solo si ambas condiciones se cumplen
        return autoDisponible && compatibilidadHabilidades;
    }

    /**
     * Asigna un auto al piloto
     * @param {Object} auto - Auto a asignar
     * @returns {Object} Información de la asignación
     * @throws {Error} Si el auto no está disponible o no es compatible
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const asignacion = piloto.conducirAuto(auto);
     * // Returns: {
     * //   piloto: "Lewis Hamilton",
     * //   auto: "Mercedes W13",
     * //   numero: 44,
     * //   estado: "asignado"
     * // }
     */
    conducirAuto(auto) {
        if (!this.puedeConducirAuto(auto)) {
            // El método 'puedeConducirAuto' ya tiene la lógica de validación
            throw new Error("El piloto no puede conducir este auto o el auto no está disponible.");
        }

        // Asignar el auto al piloto
        this.auto = auto;

        // Asignar el piloto al auto (referencia cruzada)
        auto.conductor = this;

        // Actualizar el estado del auto
        auto.estado = 'en_carrera';

        
        if (!this.autosConducidos.includes(auto.modelo)) {
            this.autosConducidos.push(auto.modelo);
        }
        return {
            piloto: this.nombre,
            auto: `${auto.marca} ${auto.modelo}`,
            numero: auto.numero,
            estado: "asignado"
        };
    }

    /**
     * Calcula el rendimiento del piloto según las condiciones
     * @param {Object} condiciones - Condiciones de la carrera
     * @param {string} condiciones.clima - Clima actual
     * @param {number} condiciones.temperatura - Temperatura en grados
     * @param {number} condiciones.humedad - Humedad relativa
     * @returns {Object} Rendimiento calculado
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const rendimiento = piloto.calcularRendimiento({
     *   clima: "seco",
     *   temperatura: 25,
     *   humedad: 40
     * });
     * // Returns: {
     * //   velocidad: 92,
     * //   consistencia: 88,
     * //   agresividad: 85,
     * //   rendimientoTotal: 88.3
     * // }
     */
    calcularRendimiento(condiciones) {
        let clima = condiciones.clima;

        if(clima ==  "lluvia"){
            this.velocidad = this.velocidad - 10;
            this.consistencia = this.consistencia - 5;
            this.agresividad = this.agresividad - 15;
        }

        const rendimientoTotal = (this.velocidad + this.consistencia + this.agresividad)/3

        return {
            velocidad: this.velocidad,
            consistencia: this.consistencia,
            agresividad: this.agresividad,
            rendimientoTotal: rendimientoTotal
        }

    }

    /**
     * Adapta el estilo de conducción según las condiciones
     * @param {Object} condiciones - Condiciones actuales
     * @returns {Object} Estilo adaptado
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estilo = piloto.adaptarEstiloConduccion({
     *   clima: "lluvia",
     *   visibilidad: "baja",
     *   estadoPista: "mojada"
     * });
     * // Returns: {
     * //   estiloAnterior: "agresivo",
     * //   estiloNuevo: "conservador",
     * //   ajustes: {
     * //     agresividad: -20,
     * //     consistencia: +15
     * //   }
     * // }
     */
    actualizarEstadisticas(){
        this.estadisticas.abandonos = this.abandonos;
        this.estadisticas.victorias = this.victorias;
        this.estadisticas.podios = this.podios;
        this.estadisticas.vueltasRapidas = this.vueltasRapidas;
    }
    adaptarEstiloConduccion(condiciones) {
        const estiloAnterior = this.estilo;
        let ajustes = { agresividad: 0, consistencia: 0 };

        // Lógica para cambiar el estilo basado en las condiciones.
        if (condiciones.clima === 'lluvia' || condiciones.estadoPista === 'mojada') {
            this.estilo = 'conservador';
            // Ajustes para un estilo conservador en lluvia
            ajustes.agresividad = -15; // Reduce la agresividad
            ajustes.consistencia = +10; // Aumenta la consistencia
        } else {
            // Asume condiciones 'secas' y un piloto que puede ser agresivo
            if (this.habilidades.agresividad > 70) {
                 this.estilo = 'agresivo';
            } else {
                this.estilo = 'medios'; // Podría haber un estilo "neutro" o "medios"
            }
        }
        
        // Aplica los ajustes a las habilidades actuales.
        // Nos aseguramos de que los valores no salgan del rango 0-100.
        this.habilidades.agresividad = Math.min(100, Math.max(0, this.habilidades.agresividad + ajustes.agresividad));
        this.habilidades.consistencia = Math.min(100, Math.max(0, this.habilidades.consistencia + ajustes.consistencia));

        // Llama al método para actualizar las estadísticas.
        // Se asume que este método ya existe o se implementará más adelante.
        this.actualizarEstadisticas();

        return {
            estiloAnterior: estiloAnterior,
            estiloNuevo: this.estilo,
            ajustesAplicados: ajustes
        };
    }

    /**
     * Registra una victoria del piloto
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.registrarVictoria();
     * // Returns: {
     * //   victorias: 1,
     * //   puntosCampeonato: 25,
     * //   estadisticas: {
     * //     victorias: 1,
     * //     podios: 0,
     * //     vueltasRapidas: 0
     * //   }
     * // }
     */
    registrarVictoria() {
        // Incrementar el contador de victorias
        this.victorias += 1;
        this.estadisticas.victorias += 1;
        
        // Asignar 25 puntos por la victoria
        const puntosPorVictoria = 25;
        this.puntosCampeonato += puntosPorVictoria;
        
        // También se considera un podio, ya que un primer lugar es un podio
        this.registrarPodio(1);
        
        // Retornar un objeto con las estadísticas actualizadas
        return {
            victorias: this.victorias,
            puntosCampeonato: this.puntosCampeonato,
            estadisticas: this.estadisticas
        };
    }

    /**
     * Registra un podio del piloto
     * @param {number} posicion - Posición en el podio (1-3)
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.registrarPodio(2);
     * // Returns: {
     * //   podios: 1,
     * //   puntosCampeonato: 18,
     * //   estadisticas: {
     * //     victorias: 0,
     * //     podios: 1,
     * //     vueltasRapidas: 0
     * //   }
     * // }
     */
    registrarPodio(posicion) {
        // Objeto con los puntos para cada posición de podio
        const puntosPorPodio = {
            1: 25,
            2: 18,
            3: 15
        };

        // 1. Validar que la posición sea un podio (1, 2 o 3)
        if (posicion < 1 || posicion > 3) {
            console.error("Error: La posición debe ser 1, 2 o 3 para ser un podio.");
            return this.obtenerEstadisticas(); // Retorna el estado actual sin cambios
        }

        // 2. Incrementar el contador de podios
        this.podios += 1;
        this.estadisticas.podios += 1;

        // 3. Sumar los puntos correspondientes a la posición
        const puntosGanados = puntosPorPodio[posicion];
        this.puntosCampeonato += puntosGanados;

        // 4. Retornar un objeto con las estadísticas actualizadas
        return {
            podios: this.podios,
            puntosCampeonato: this.puntosCampeonato,
            estadisticas: this.estadisticas
        };
    }

    /**
     * Registra una vuelta rápida del piloto
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.registrarVueltaRapida();
     * // Returns: {
     * //   vueltasRapidas: 1,
     * //   puntosCampeonato: 1,
     * //   estadisticas: {
     * //     victorias: 0,
     * //     podios: 0,
     * //     vueltasRapidas: 1
     * //   }
     * // }
     */
    registrarVueltaRapida() {
        // Incrementar el contador de vueltas rápidas
        this.vueltasRapidas += 1;
        this.estadisticas.vueltasRapidas += 1;

        // Sumar 1 punto al campeonato por la vuelta rápida
        this.puntosCampeonato += 1;
        
        // Retornar un objeto con las estadísticas actualizadas
        return {
            vueltasRapidas: this.vueltasRapidas,
            puntosCampeonato: this.puntosCampeonato,
            estadisticas: this.estadisticas
        };
    }

    /**
     * Obtiene todas las estadísticas del piloto
     * @returns {Object} Estadísticas completas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.obtenerEstadisticas();
     * // Returns: {
     * //   general: {
     * //     victorias: 5,
     * //     podios: 12,
     * //     vueltasRapidas: 3,
     * //     puntosCampeonato: 150
     * //   },
     * //   habilidades: {
     * //     velocidad: 95,
     * //     consistencia: 90,
     * //     agresividad: 85
     * //   },
     * //   rendimiento: {
     * //     adelantamientos: 15,
     * //     errores: 2,
     * //     vueltasCompletadas: 450
     * //   }
     * // }
     */
    obtenerEstadisticas() {
        return {
            general: {
                victorias: this.victorias,
                podios: this.podios,
                vueltasRapidas: this.vueltasRapidas,
                puntosCampeonato: this.puntosCampeonato
            },
            habilidades: {
                velocidad: this.habilidades.velocidad,
                consistencia: this.habilidades.consistencia,
                agresividad: this.habilidades.agresividad
            },
            rendimiento: {
                adelantamientos: this.adelantamientos,
                errores: this.errores,
                autosConducidos: this.autosConducidos
            }
        };
    }
}

module.exports = Piloto; 