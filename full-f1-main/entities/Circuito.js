class Circuito {
    constructor(nombre, ubicacion, longitudKm) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.longitudKm = longitudKm;
        this.curvas = [];
        this.recordVuelta = null;
        this.zonasDRS = [];
        this.condicionesClimaticas = {
            clima: 'seco',
            temperatura: 25,
            humedad: 50
        };
    }
    factorCircuito(){
        return this.longitudKm / 5;
    }
    /**
     * Determina si el circuito es desafiante según sus características
     * @returns {boolean} true si:
     * - Tiene más de 10 curvas
     * - Al menos 2 zonas DRS
     * - Longitud > 5km
     * - Dificultad promedio alta
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * circuito.curvas = [/* 12 curvas *\/];
     * circuito.zonasDRS = [
     *   { nombre: "Túnel", longitud: 0.5 },
     *   { nombre: "Nouvelle Chicane", longitud: 0.3 }
     * ];
     * const esDesafiante = circuito.esDesafiante();
     * // Returns: true
     */
    esDesafiante() {
        // Calcular la dificultad promedio
        const totalDificultad = this.curvas.reduce((sum, curva) => {
            if (curva.dificultad === 'alta') return sum + 3;
            if (curva.dificultad === 'media') return sum + 2;
            return sum + 1;
        }, 0);

        const dificultadPromedio = this.curvas.length > 0 ? (totalDificultad / this.curvas.length) : 0;
        const dificultadPromedioAlta = dificultadPromedio >= 2.5;

        // Validar todas las condiciones
        return this.curvas.length > 10 &&
               this.zonasDRS.length >= 2 &&
               this.longitudKm > 5 &&
               dificultadPromedioAlta;
    }
    factorClima(){
        if(this.condicionesClimaticas.clima == "seco"){
            return 1.00;
        }
        else if(this.condicionesClimaticas.clima == "mojado"){
            return 1.10;
        }
        else if(this.condicionesClimaticas.clima == "lluvia"){
            return 1.15;
        }
    }

    /**
     * Agrega una nueva curva al circuito
     * @param {string} nombre - Nombre de la curva
     * @param {number} velocidadMaxima - Velocidad máxima permitida en km/h
     * @param {string} dificultad - Nivel de dificultad (baja, media, alta)
     * @returns {Object} Información de la curva agregada
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const curva = circuito.agregarCurva("Loews Hairpin", 50, "alta");
     * // Returns: {
     * //   nombre: "Loews Hairpin",
     * //   velocidadMaxima: 50,
     * //   dificultad: "alta",
     * //   numeroCurva: 6
     * // }
     */
    agregarCurva(nombre, velocidadMaxima, dificultad) {
        const dificultadesValidas = ['baja', 'media', 'alta'];
        if (!dificultadesValidas.includes(dificultad)) {
            throw new Error('La dificultad de la curva debe ser "baja", "media" o "alta".');
        }

        const nuevaCurva = { nombre, velocidadMaxima, dificultad };
        this.curvas.push(nuevaCurva);
        
        return {
            ...nuevaCurva,
            numeroCurva: this.curvas.length
        };
    }

    /**
     * Agrega una nueva zona DRS al circuito
     * @param {string} nombre - Nombre de la zona DRS
     * @param {number} longitud - Longitud de la zona en kilómetros
     * @returns {Object} Información de la zona DRS agregada
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const zonaDRS = circuito.agregarZonaDRS("Túnel", 0.5);
     * // Returns: {
     * //   nombre: "Túnel",
     * //   longitud: 0.5,
     * //   numeroZona: 1
     * // }
     */
    agregarZonaDRS(nombre, longitud) {
        if (typeof longitud !== 'number' || longitud <= 0) {
            throw new Error('La longitud de la zona DRS debe ser un número positivo.');
        }

        const nuevaZona = { nombre, longitud };
        this.zonasDRS.push(nuevaZona);

        return {
            ...nuevaZona,
            numeroZona: this.zonasDRS.length
        };
    }

    /**
     * Establece las condiciones climáticas actuales del circuito
     * @param {string} clima - Tipo de clima (seco, lluvia, mixto)
     * @param {number} temperatura - Temperatura en grados Celsius
     * @param {number} humedad - Humedad relativa en porcentaje
     * @returns {Object} Condiciones climáticas actualizadas
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const condiciones = circuito.establecerCondicionesClimaticas("lluvia", 18, 85);
     * // Returns: {
     * //   clima: "lluvia",
     * //   temperatura: 18,
     * //   humedad: 85,
     * //   visibilidad: "baja"
     * // }
     */
    establecerCondicionesClimaticas(clima, temperatura, humedad) {
        const climasValidos = ['seco', 'lluvia', 'mixto'];
        if (!climasValidos.includes(clima)) {
            throw new Error('El clima debe ser "seco", "lluvia" o "mixto".');
        }
        if (typeof temperatura !== 'number' || temperatura < -20 || temperatura > 60) {
            throw new Error('La temperatura debe estar entre -20 y 60 grados Celsius.');
        }
        if (typeof humedad !== 'number' || humedad < 0 || humedad > 100) {
            throw new Error('La humedad debe estar entre 0 y 100%.');
        }

        this.condicionesClimaticas.clima = clima;
        this.condicionesClimaticas.temperatura = temperatura;
        this.condicionesClimaticas.humedad = humedad;

        return {
            ...this.condicionesClimaticas,
            visibilidad: clima === 'lluvia' ? 'baja' : 'normal'
        };
    }

    /**
     * Actualiza el récord de vuelta del circuito si el nuevo tiempo es mejor
     * @param {number} tiempo - Tiempo de vuelta en segundos
     * @param {string} piloto - Nombre del piloto
     * @returns {Object} Información del récord actualizado
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const record = circuito.actualizarRecordVuelta(71.553, "Max Verstappen");
     * // Returns: {
     * //   tiempo: 71.553,
     * //   piloto: "Max Verstappen",
     * //   fecha: "2024-05-26",
     * //   esNuevoRecord: true
     * // }
     */
    actualizarRecordVuelta(tiempo, piloto) {
        const esNuevoRecord = !this.recordVuelta || tiempo < this.recordVuelta.tiempo;

        if (esNuevoRecord) {
            this.recordVuelta = {
                tiempo,
                piloto: piloto.nombre,
                fecha: new Date().toISOString().slice(0, 10) // Formato YYYY-MM-DD
            };
        }

        return {
            tiempo,
            piloto: piloto.nombre,
            esNuevoRecord
        };
    }

    /**
     * Obtiene estadísticas detalladas del circuito
     * @returns {Object} Estadísticas del circuito
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const estadisticas = circuito.obtenerEstadisticasCircuito();
     * // Returns: {
     * //   numeroCurvas: 12,
     * //   zonasDRS: 2,
     * //   recordVuelta: {
     * //     tiempo: 71.553,
     * //     piloto: "Max Verstappen",
     * //     fecha: "2024-05-26"
     * //   },
     * //   condicionesActuales: {
     * //     clima: "seco",
     * //     temperatura: 25,
     * //     humedad: 50
     * //   },
     * //   dificultadPromedio: "alta"
     * // }
     */
    obtenerEstadisticasCircuito() {
        const totalDificultad = this.curvas.reduce((sum, curva) => {
            if (curva.dificultad === 'alta') return sum + 3;
            if (curva.dificultad === 'media') return sum + 2;
            return sum + 1;
        }, 0);
        const dificultadPromedio = this.curvas.length > 0 ? (totalDificultad / this.curvas.length) : 0;
        const dificultadNivel = dificultadPromedio >= 2.5 ? 'alta' : dificultadPromedio >= 1.5 ? 'media' : 'baja';

        return {
            nombreCircuito: this.nombre,
            numeroCurvas: this.curvas.length,
            zonasDRS: this.zonasDRS.length,
            longitud: `${this.longitudKm}km`,
            recordVuelta: this.recordVuelta,
            condicionesActuales: this.condicionesClimaticas,
            dificultadPromedio: dificultadNivel
        };
    }
}

module.exports = Circuito;