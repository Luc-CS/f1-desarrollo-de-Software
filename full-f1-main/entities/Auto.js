class Auto {
    constructor(numero, marca, modelo, neumaticos, velocidadMaxima, combustible) {
        this.numero = numero;
        this.marca = marca;
        this.modelo = modelo;
        this.neumaticos = neumaticos;
        this.velocidadMaxima = velocidadMaxima;
        this.combustible = combustible;
        this.estado = 'en_carrera'; // en_carrera, en_boxes, reserva, desarrollo
        this.conductor = null;
        this.tiempoVuelta = 0;
        this.desgasteNeumaticos = 0;
        this.desgasteMotor = 0;
        this.kmRecorridos = 0;
        this.piezasNuevas = [];
        this.tiempoReparacion = 0;
    }

    /**
     * Configura los niveles iniciales de desgaste del auto
     * @param {Object} configuracion - Objeto con niveles iniciales de desgaste
     * @param {number} configuracion.desgasteNeumaticos - Desgaste inicial de neumáticos (0-100)
     * @param {number} configuracion.desgasteMotor - Desgaste inicial del motor (0-100)
     * @param {number} configuracion.combustible - Nivel inicial de combustible (0-100)
     * @returns {void}
     * @throws {Error} Si algún valor está fuera del rango 0-100
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * auto.configurarDesgasteInicial({
     *   desgasteNeumaticos: 0,
     *   desgasteMotor: 0,
     *   combustible: 100
     * });
     */
    
    factorNeumaticos(){
        if(this.neumaticos == "blandos"){
            return 0.95;
        }
        else if(this.neumaticos == "medios"){
            return 1.00;
        }
        else if(this.neumaticos == "duros"){
            return 1.05;
        }
    }
 
    factorDesgaste(){
        return 1 + (this.desgasteNeumaticos * 0.001);
    }
    calcularTiempoVuelta(){

    }
    configurarDesgasteInicial(configuracion) { //1.1 Listo
        if(!(configuracion.desgasteNeumaticos >= 0 && configuracion.desgasteNeumaticos <= 100)){
            return false;
        }
        if(!(configuracion.desgasteMotor >= 0 && configuracion.desgasteMotor <= 100)){
            return false;
        }
        if(!(configuracion.combustible >= 0 && configuracion.combustible <= 100)){
            return false;
        }
        return true;
    }
    //TIEMPO DE VUELTA X AUTO
    tiempoVuelta(){
        return tiempoBase() * this.conductor.factorPiloto() * this.factorDesgaste() * condicionesClimaticas.factorClima() * this.factorNeumaticos();
    }

    tiempoBase(){
        return ((this.circuito.longitudKm / this.velocidadMaxima)* 3600);
    }

    /**
     * Verifica si el auto está en condiciones óptimas para competir
     * @returns {boolean} true si:
     * - Desgaste de neumáticos < 30%
     * - Nivel de combustible > 20%
     * - Desgaste del motor < 40%
     * - Si está en carrera, debe tener conductor asignado
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * auto.conductor = "Lewis Hamilton";
     * const estaOptimo = auto.estaEnCondicionesOptimas();
     * // Returns: true si cumple todas las condiciones
     */
    estaEnCondicionesOptimas() {//1.2
        const desgTires = this.desgasteNeumaticos < 30;
        const combus = this.combustible > 20;
        const desgMotor = this.desgasteMotor < 40;

        if(this.estado == "en_carrera" && this.conductor != null){
            const estado_conductor = true;
        }

        return desgTires && combus && desgMotor && estado_conductor;
    }

    /**
     * Cambia los neumáticos del auto
     * @param {string} tipoNeumaticos - Tipo de neumáticos a instalar (blandos, medios, duros)
     * @returns {Object} Información sobre el cambio de neumáticos
     * @throws {Error} Si el tipo de neumáticos no es válido
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const resultado = auto.cambiarNeumaticos("duros");
     * // Returns: { tipoAnterior: "blandos", tipoNuevo: "duros", desgasteReseteado: true }
     */
    cambiarNeumaticos(tipoNeumaticos) {
        const tiposValidos = ['blandos', 'medios', 'duros'];
        if (tiposValidos.includes(tipoNeumaticos)) {
        this.tipoNeumaticos = tipoNeumaticos;
        this.desgasteNeumaticos = 0; // Resetear el desgaste
        console.log(`Neumáticos cambiados a ${tipoNeumaticos}.`);
        } else {
        console.log('Error: Tipo de neumáticos no válido.');
        }
    }

    /**
     * Reposta combustible en el auto
     * @param {number} cantidad - Cantidad de combustible a repostar (0-100)
     * @returns {Object} Información sobre el repostaje
     * @throws {Error} Si la cantidad supera el 100% del tanque
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 50);
     * const resultado = auto.repostarCombustible(30);
     * // Returns: { combustibleAnterior: 50, combustibleNuevo: 80 }
     */
    repostarCombustible(cantidad) {
        this.nivelCombustible = Math.min(this.nivelCombustible + cantidad, 100);
        console.log(`Combustible repostado. Nivel actual: ${this.nivelCombustible}%`);
    }

    /**
     * Instala una nueva pieza en el auto
     * @param {Object} pieza - Información de la pieza a instalar
     * @param {string} pieza.tipo - Tipo de pieza (motor, aerodinámica, neumáticos, suspensión)
     * @param {string} pieza.especificacion - Especificación técnica de la pieza
     * @returns {Object} Información sobre la instalación
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const resultado = auto.instalarPiezaNueva({
     *   tipo: "motor",
     *   especificacion: "nueva versión"
     * });
     * // Returns: { piezaInstalada: true, estadoActualizado: "desarrollo" }
     */
    instalarPiezaNueva(pieza) {
        this.historialPiezas.push(pieza); 
        this.estado = 'en_desarrollo';
        console.log(`Pieza '${pieza}' instalada. El auto está ahora en modo de desarrollo.`);
    }

    /**
     * Calcula el desgaste del auto después de una vuelta
     * @param {Object} vuelta - Información de la vuelta
     * @param {number} vuelta.numero - Número de vuelta
     * @param {number} vuelta.velocidad - Velocidad promedio en km/h
     * @param {Object} vuelta.condiciones - Condiciones de la pista
     * @returns {Object} Información sobre el desgaste
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const desgaste = auto.calcularDesgaste({
     *   numero: 15,
     *   velocidad: 210,
     *   condiciones: { temperatura: 25, humedad: 40 }
     * });
     * // Returns: { desgasteNeumaticos: 2.5, desgasteMotor: 1.2, combustibleConsumido: 1.8 }
     */
    calcularDesgaste(vuelta) {
        const factorVelocidad = vuelta.velocidad / this.velocidadMaxima;
    
        const factorNeumaticos = this.factorNeumaticos(); // Reutilizamos el método existente

        const desgasteNeumaticosVuelta = (0.5 * factorVelocidad * factorNeumaticos);
        this.desgasteNeumaticos = Math.min(100, this.desgasteNeumaticos + desgasteNeumaticosVuelta);

        const desgasteMotorVuelta = (0.2 * factorVelocidad);
        this.desgasteMotor = Math.min(100, this.desgasteMotor + desgasteMotorVuelta);
        

        const consumoCombustibleVuelta = (0.3 * factorVelocidad);
        this.combustible = Math.max(0, this.combustible - consumoCombustibleVuelta);


        this.kmRecorridos += this.circuito.longitudKm; // Requiere que el auto tenga una propiedad 'circuito' con longitudKm

        return {
            desgasteNeumaticos: desgasteNeumaticosVuelta,
            desgasteMotor: desgasteMotorVuelta,
            combustibleConsumido: consumoCombustibleVuelta
        };
    }

    /**
     * Realiza un pit stop completo
     * @param {string} tipoNeumaticos - Tipo de neumáticos a instalar
     * @param {number} combustible - Cantidad de combustible a repostar
     * @returns {Object} Información sobre el pit stop
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 50);
     * const pitStop = auto.realizarPitStop("duros", 30);
     * // Returns: { 
     * //   estado: "en_boxes",
     * //   operaciones: ["cambio_neumaticos", "repostaje"],
     * //   tiempoTotal: 4.2
     * // }
     */
    realizarPitStop(tipoNeumaticos, combustible) {
        // Guardar el estado actual del auto antes del pit stop
        const estadoAnterior = this.estado;
        const tipoNeumaticosAnterior = this.neumaticos;
        const combustibleAnterior = this.combustible;

        // 1. Actualizar el estado a 'en_boxes'
        this.estado = 'en_boxes';
        console.log(`El auto ${this.numero} ha entrado a boxes.`);

        // 2. Ejecutar el cambio de neumáticos
        this.cambiarNeumaticos(tipoNeumaticos);

        // 3. Ejecutar el repostaje de combustible
        this.repostarCombustible(combustible);

        // 4. Actualizar el estado de vuelta a 'en_carrera'
        this.estado = 'en_carrera';
        console.log(`El auto ${this.numero} sale de boxes, listo para la carrera.`);

        // 5. Retornar información sobre el pit stop
        return {
            estadoFinal: this.estado,
            neumaticosCambiados: {
                anterior: tipoNeumaticosAnterior,
                nuevo: this.neumaticos
            },
            combustibleRepostado: {
                anterior: combustibleAnterior,
                nuevo: this.combustible
            },
            tiempoEstimado: 3.5 // Un valor fijo como ejemplo, o podría ser un cálculo más complejo
        };
    }

    /**
     * Obtiene estadísticas detalladas del desgaste del auto
     * @returns {Object} Estadísticas de desgaste
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const estadisticas = auto.obtenerEstadisticasDesgaste();
     * // Returns: {
     * //   desgasteNeumaticos: 45,
     * //   nivelCombustible: 60,
     * //   estadoMotor: 30,
     * //   estado: "en_carrera"
     * // }
     */
    obtenerEstadisticasDesgaste() {
        return {
            desgasteNeumaticos: this.desgasteNeumaticos,
            nivelCombustible: this.combustible, // El nombre de la propiedad es 'combustible' en el constructor
            desgasteMotor: this.desgasteMotor,
            estado: this.estado
        };
    }
}

module.exports = Auto;