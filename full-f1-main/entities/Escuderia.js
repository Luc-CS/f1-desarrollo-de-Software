class Escuderia {
    constructor(nombre, paisOrigen, presupuesto) {
        this.nombre = nombre;
        this.paisOrigen = paisOrigen;
        this.presupuesto = presupuesto;
        this.autos = [];
        this.pilotos = [];
        this.desarrollo = {
            motor: { nivel: 0, estadisticas: { potencia: 0, eficiencia: 0 } },
            aerodinamica: { nivel: 0, estadisticas: { carga: 0, resistencia: 0 } },
            neumaticos: { nivel: 0, estadisticas: { durabilidad: 0, agarre: 0 } },
            suspension: { nivel: 0, estadisticas: { estabilidad: 0, respuesta: 0 } }
        };
        this.estadisticas = {
            victorias: 0,
            podios: 0,
            vueltasRapidas: 0,
            abandonos: 0
        };
        this.montoInvertido = 0;
    }

    /**
     * Invierte un monto en el desarrollo de un área específica
     * @param {string} area - Área de desarrollo (motor, aerodinámica, neumáticos, suspensión)
     * @param {number} monto - Cantidad a invertir
     * @returns {Object} Información sobre la inversión
     * @throws {Error} Si el presupuesto es insuficiente o el área no es válida
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const inversion = escuderia.invertirEnDesarrollo("motor", 200000);
     * // Returns: {
     * //   area: "motor",
     * //   montoInvertido: 200000,
     * //   presupuestoRestante: 800000,
     * //   nivelAnterior: 0,
     * //   nivelNuevo: 2
     * // }
     */
    invertirEnDesarrollo(area, monto) {
        let retorno = new Map();
            retorno.set("area", area);
            retorno.set("montoInvertido", monto);
            retorno.set("PresupuestoRestante", (this.presupuesto - monto));
            retorno.set("NivelAnterior", 0);
            retorno.set("NivelNuevo", (this.monto/100000));

        this.desarrollo[area].nivel = (this.monto/100000);   
         this.montoInvertido = monto;   
        return retorno;
    }

    /**
     * Calcula la mejora esperada en un área según el monto invertido
     * @param {string} area - Área de desarrollo
     * @param {number} monto - Monto a invertir
     * @returns {Object} Cálculo de la mejora esperada
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const mejora = escuderia.calcularMejora("motor", 200000);
     * // Returns: {
     * //   area: "motor",
     * //   mejoraPotencia: 15,
     * //   mejoraEficiencia: 10,
     * //   nivelAlcanzado: 2
     * // }
     */
    calcularMejora(area, monto) {
        const puntosObtenidos = Math.floor(monto / 100000);

        let mejoraCalculada = {};
     switch (area) {
        case "motor":
            // Investment in the engine improves speed and efficiency.
            mejoraCalculada = {
                mejoraVelocidadMaxima: puntosObtenidos * 0.5, // e.g., 0.5 km/h per point
                mejoraAceleracion: puntosObtenidos * 0.2 // e.g., 0.2% per point
            };
            break;
        case "aerodinamica":
            // Investment in aerodynamics improves cornering and reduces fuel usage.
            mejoraCalculada = {
                mejoraAgarreEnCurva: puntosObtenidos * 0.4, // e.g., 0.4% per point
                reduccionConsumoCombustible: puntosObtenidos * 0.3 // e.g., 0.3% per point
            };
            break;
        case "neumaticos":
            // Investment in tires improves grip and reduces degradation.
            mejoraCalculada = {
                mejoraAgarreGeneral: puntosObtenidos * 0.6, // e.g., 0.6% per point
                reduccionDesgasteNeumaticos: puntosObtenidos * 0.5 // e.g., 0.5% per point
            };
            break;
        case "suspension":
            // Investment in suspension improves handling and tire life.
            mejoraCalculada = {
                mejoraManejoEnBumps: puntosObtenidos * 0.7, // e.g., 0.7% per point
                mejoraVidaUtilNeumaticos: puntosObtenidos * 0.4 // e.g., 0.4% per point
            };
            break;
        default:
            throw new Error("Área de desarrollo no válida.");
     }
    }
    /**
     * Valida si el desarrollo en un área fue exitoso
     * @param {string} area - Área de desarrollo
     * @returns {boolean} true si el desarrollo fue exitoso
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * escuderia.desarrollo.motor.nivel = 2;
     * const esExitoso = escuderia.esDesarrolloExitoso("motor");
     * // Returns: true si el nivel de desarrollo es adecuado y el presupuesto fue bien utilizado
     */

     esDesarrolloExitoso(area) {
         this.desarrollo[area].nivel > 1; 
     }


     /**
     * Obtiene todas las estadísticas de la escudería
     * @returns {Object} Estadísticas completas
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const estadisticas = escuderia.obtenerEstadisticas();
     * // Returns: {
     * //   desarrollo: {
     * //     motor: { nivel: 2, estadisticas: { potencia: 85, eficiencia: 80 } },
     * //     aerodinamica: { nivel: 1, estadisticas: { carga: 75, resistencia: 70 } },
     * //     neumaticos: { nivel: 1, estadisticas: { durabilidad: 80, agarre: 75 } },
     * //     suspension: { nivel: 1, estadisticas: { estabilidad: 75, respuesta: 80 } }
     * //   },
     * //   rendimiento: {
     * //     victorias: 5,
     * //     podios: 12,
     * //     vueltasRapidas: 3,
     * //     abandonos: 2
     * //   },
     * //   presupuesto: {
     * //     total: 1000000,
     * //     disponible: 800000,
     * //     invertido: 200000
     * //   }
     * // }
     */
    obtenerEstadisticas() {
        let retorno = new Map();
            retorno.set("total", this.presupuesto);
            retorno.set("disponible", (this.presupuesto-this.montoInvertido));
            retorno.set("invertido", this.montoInvertido);


        return this.desarrollo, this.estadisticas, retorno;
    }

    /**
     * Actualiza una estadística específica de la escudería
     * @param {string} tipo - Tipo de estadística (victoria, podio, vueltaRapida, abandono)
     * @param {number} cantidad - Cantidad a actualizar
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const actualizacion = escuderia.actualizarEstadisticas("victoria", 1);
     * // Returns: {
     * //   tipo: "victoria",
     * //   cantidadAnterior: 0,
     * //   cantidadNueva: 1,
     * //   estadisticasActualizadas: {
     * //     victorias: 1,
     * //     podios: 0,
     * //     vueltasRapidas: 0,
     * //     abandonos: 0
     * //   }
     * // }
     */
    actualizarEstadisticas(tipo, cantidad) {
        this.estadisticas[tipo] = cantidad;

        let retorno = new Map();
            retorno.set("tipo", tipo);
            retorno.set("cantidadAnt", this.estadisticas[tipo] - cantidad);
            retorno.set("cantidadNew", cantidad);


        return retorno,this.estadisticas;

    }
}

module.exports = Escuderia;