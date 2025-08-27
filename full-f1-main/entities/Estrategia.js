class Estrategia {
    constructor(numeroParadas, tiposNeumaticos, vueltasParada, agresividad) {
        this.numeroParadas = numeroParadas;
        this.tiposNeumaticos = tiposNeumaticos;
        this.vueltasParada = vueltasParada;
        this.agresividad = agresividad;
        this.paradasRealizadas = 0;
        this.tiempoTotalPitStops = 0;
    }

    /**
     * Valida si la estrategia es óptima según las condiciones de la carrera
     * @returns {boolean} true si:
     * - El número de paradas es adecuado para la duración de la carrera
     * - La distribución de neumáticos es óptima
     * - El nivel de agresividad es apropiado
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2, // número de paradas
     *   ["blandos", "duros", "duros"], // tipos de neumáticos
     *   [20, 40], // vueltas de parada
     *   "media" // agresividad
     * );
     * const esOptima = estrategia.esOptima();
     * // Returns: true si la estrategia es óptima para una carrera de 60 vueltas
     */
    
    esOptima() {
    let optima = true;

    const durabilidadNeumaticos = {
        "chill": { "blandos": 20, "medios": 35, "duros": 45 },
        "media": { "blandos": 15, "medios": 27, "duros": 37 },
        "agresivo": { "blandos": 10, "medios": 20, "duros": 30 }
    };

    if (this.numeroParadas !== this.tiposNeumaticos.length - 1 || this.numeroParadas <= 3) {
        return false; 
    }
    
    let vueltasRecorridas = 0;
    
    for (let i = 0; i < this.vueltasParada.length; i++) {
        const vueltasStint = this.vueltasParada[i];
        const tipoNeumatico = this.tiposNeumaticos[i];
        const durabilidadEsperada = durabilidadNeumaticos[this.agresividad][tipoNeumatico];

        if (vueltasStint > durabilidadEsperada) {
            console.log(`La estrategia no es optima`);
            return false;
        }
        vueltasRecorridas += vueltasStint;
    }

    // Validar el último stint
    const vueltasUltimoStint = 60 - vueltasRecorridas;
    const tipoNeumaticoUltimo = this.tiposNeumaticos[this.tiposNeumaticos.length - 1];
    const durabilidadUltimoNeumatico = durabilidadNeumaticos[this.agresividad][tipoNeumaticoUltimo];

    if (vueltasUltimoStint > durabilidadUltimoNeumatico) {
        console.log(`La estrategia no es optima`);
        return false;
    }
    return optima;
}


    /**
     * Verifica si las paradas están distribuidas uniformemente
     * @returns {boolean} true si:
     * - Los intervalos entre paradas son similares
     * - Las vueltas de parada están bien espaciadas
     * - No hay acumulación de paradas
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const distribucion = estrategia.paradasDistribuidasUniformemente();
     * // Returns: true si los intervalos entre paradas son similares
     */
    paradasDistribuidasUniformemente() {
        let optima = true;

        const durabilidadNeumaticos = {
        "chill": { "blandos": 20, "medios": 35, "duros": 45 },
        "media": { "blandos": 15, "medios": 27, "duros": 37 },
        "agresivo": { "blandos": 10, "medios": 20, "duros": 30 }
        };

        if (this.numeroParadas !== this.tiposNeumaticos.length - 1 || this.numeroParadas != this.vueltasParada.length) {
        return false; 
        }
    
        let vueltasRecorridas = 0;
    
        for (let i = 0; i < this.vueltasParada.length; i++) {
        const vueltasStint = this.vueltasParada[i];
        const tipoNeumatico = this.tiposNeumaticos[i];
        const durabilidadEsperada = durabilidadNeumaticos[this.agresividad][tipoNeumatico];

        if (vueltasStint > durabilidadEsperada) {
            console.log(`Los intervalos no son similares, hubo un error`);
            return false;
        }
        vueltasRecorridas += vueltasStint;
        }

        return optima;
    }

    /**
     * Valida si el nivel de agresividad es consistente
     * @returns {boolean} true si:
     * - La agresividad es consistente con el tipo de neumáticos
     * - El nivel es apropiado para las condiciones
     * - No hay cambios bruscos de agresividad
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const agresividad = estrategia.agresividadConsistente();
     * // Returns: true si la agresividad es consistente con la estrategia
     */
    agresividadConsistente() {
        // Implementar lógica para validar agresividad
    }

    agresividadConsistente() {
        const puntajeNeumaticos = {
            "blandos": 3,
            "medios": 2,
            "duros": 1
        };
    
        const puntajeAgresividad = {
            "agresivo": 3,
            "media": 2,
            "chill": 1
        };

        // Calcular el puntaje total de los neumáticos en la estrategia
        let sumaPuntajeNeumaticos = 0;
        for (const tipo of this.tiposNeumaticos) {
        sumaPuntajeNeumaticos += puntajeNeumaticos[tipo] || 0;
        }

        // Calcular el puntaje promedio de los neumáticos
        const promedioPuntajeNeumaticos = sumaPuntajeNeumaticos / this.tiposNeumaticos.length;
    
        // Obtener el puntaje del nivel de agresividad
        const puntajeEstrategia = puntajeAgresividad[this.agresividad];

        // Definir un rango de tolerancia.
        // Una estrategia es consistente si el puntaje promedio de los neumáticos
        // está cerca del puntaje de la agresividad.
        const tolerancia = 0.5; // El puntaje puede variar 0.5 puntos.

        // Comparamos los valores.
        const esConsistente = Math.abs(promedioPuntajeNeumaticos - puntajeEstrategia) <= tolerancia;

        return esConsistente;
    }
    /**
     * Registra una parada en boxes con su tiempo
     * @param {number} tiempo - Tiempo de la parada en segundos
     * @returns {Object} Información de la parada registrada
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const parada = estrategia.registrarParada(2.5);
     * // Returns: {
     * //   numeroParada: 1,
     * //   tiempo: 2.5,
     * //   vuelta: 20,
     * //   neumaticos: "duros",
     * //   tiempoTotalPitStops: 2.5
     * // }
     */
    registrarParada(tiempo) {
        this.paradasRealizadas++;
        this.tiempoTotalPitStops += tiempo;
        let retorno = new Map();
            retorno.set("numeroParada", this.paradasRealizadas);
            retorno.set("tiempo", tiempo);
            retorno.set("vuelta", this.vueltasParada[this.paradasRealizadas-1]);
            retorno.set("neumaticos", this.tiposNeumaticos[this.paradasRealizadas]);
            retorno.set("tiempoTotalPitStops", this.tiempoTotalPitStops);


        return retorno,this.estadisticas;
    }

    /**
     * Obtiene información sobre la próxima parada programada
     * @returns {Object} Detalles de la próxima parada
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const siguienteParada = estrategia.obtenerSiguienteParada();
     * // Returns: {
     * //   vuelta: 20,
     * //   neumaticos: "duros",
     * //   tiempoEstimado: 2.5,
     * //   paradaNumero: 1
     * // }
     */
    obtenerSiguienteParada() {
        let paradanum = this.paradasRealizadas +1;
        let neu = this.tiposNeumaticos[paradanum];
        let para = this.vueltasParada[paradanum-1]
        this.tiempoTotalPitStops += tiempo;
        let retorno = new Map();
            retorno.set("vuelta", tiempo);
            retorno.set("neumatico", para);
            retorno.set("tiempoEstimado", neu);
            retorno.set("paradaNumero", paradanum);


        return retorno,this.estadisticas;
    }
}

module.exports = Estrategia; 