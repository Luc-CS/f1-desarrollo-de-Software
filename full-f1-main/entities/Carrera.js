class Carrera {
    constructor(nombre, circuito, fecha) {
        this.nombre = nombre;
        this.circuito = circuito;
        this.fecha = fecha;
        this.autosParticipantes = [];
        this.condicionesClimaticas = null;
        this.numeroVueltas = 0;
        this.resultados = [];
        this.clasificacion = {
            q1: [],
            q2: [],
            q3: []
        };
        this.vueltaRapida = null;
    }

    /**
     * Inicia la carrera validando requisitos mínimos y estableciendo condiciones iniciales
     * @returns {Object} Información sobre el inicio de la carrera
     * @throws {Error} Si no se cumplen los requisitos mínimos
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const inicio = carrera.iniciarCarrera();
     * // Returns: {
     * //   estado: "iniciada",
     * //   numeroVueltas: 78,
     * //   autosParticipantes: 20,
     * //   condicionesClimaticas: { clima: "seco", temperatura: 25, humedad: 40 }
     * // }
     */

    cronometraje(){
        let vueltas = 0;
    

        while(vueltas < this.numeroVueltas){
            vueltas++;
            console.log("Vuelta completada");
        }
        console.log("Carrera terminada!")
    }

    iniciarCarrera() {
        if(this.esValida() == true){
            let retorno = new Map();
            retorno.set("Estado: ","Iniciada");
            retorno.set("NumeroVueltas: ", this.numeroVueltas);
            retorno.set("AutosParticipantes: ",this.autosParticipantes.length);
            retorno.set("CondicionesClimaticas: ",this.condicionesClimaticas );
            return retorno;

            cronometraje();
        }
        else{
            return "No se puede iniciar la carrera";
        }
    }
    

    tiempoVuelta(){
        return tiempoBase() * this.promedioFactorPiloto() * this.promedioNeumaticosAutitos() * condicionesClimaticas.factorClima() * this.promedioDesgasteAutitos();
    }
    tiempoBase(){
        return ((this.circuito.longitudKm / this.promedioVelocidadMaxAutitos())* 3600);
    }
    promedioVelocidadMaxAutitos(){
        return (this.autosParticipantes.reduce((acumulador, auto) => acumulador + auto.velocidadMaxima,0) / this.autosParticipantes.length);
    }
    promedioDesgasteAutitos(){
        return (this.autosParticipantes.reduce((acumulador, auto) => acumulador + auto.factorDesgaste(),0) / this.autosParticipantes.length);
    }
    promedioNeumaticosAutitos(){
        return (this.autosParticipantes.reduce((acumulador, auto) => acumulador + auto.factorNeumaticos(),0) / this.autosParticipantes.length);
    }
    promedioFactorPiloto(){
        return (this.autosParticipantes.reduce((acumulador, auto) => acumulador + auto.conductor.factorPiloto(),0) / this.autosParticipantes.length);
    }

    consumoVueltas(){
        return 2.5 * this.circuito.factorCircuito();
    }
    vueltasxCombustible(){
        return 110 * this.consumoVueltas();
    }
    factorDegracion(){
        if(this.circuito.nombre == "Monaco"){
            return this.promedioDesgasteAutitos() * 1.2;
        }
        else if(this.circuito.nombre == "Barcelona"){
            return this.promedioDesgasteAutitos() * 0.8;
        }
    }
    /**
     * Verifica si la carrera cumple con los requisitos mínimos
     * @returns {boolean} true si:
     * - Hay al menos 10 autos
     * - El circuito es válido
     * - Las condiciones climáticas están establecidas
     * - La fecha es válida
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * carrera.autosParticipantes = [/* 15 autos *\/];
     * carrera.condicionesClimaticas = { clima: "seco", temperatura: 25, humedad: 40 };
     * const esValida = carrera.esValida();
     * // Returns: true
     */
    esValida() {
        if(this.autosParticipantes.length >= 10 && this.circuito == true && this.condicionesClimaticas != null && this.fecha != null){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Calcula el número de vueltas según la longitud del circuito y duración objetivo
     * @returns {number} Número de vueltas calculado
     * +
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const vueltas = carrera.calcularNumeroVueltas();
     * // Returns: 78 (para Mónaco)
     */
    calcularNumeroVueltas() {
        let velocidadPromedio = this.promedioVelocidadMaxAutitos() * 0.8;
        let tiempo_vuelta = this.circuito.longitudKm/velocidadPromedio * 3600;
        let vueltas_duracion = (90*60) / tiempo_vuelta;

        let factorCircuito = this.circuito.longitudKm / 5;
        let consumo_vuelta = 2.5 * factorCircuito;
        let vueltas_Combus = 110 / consumo_vuelta;

        let factor_degra = this.circuito.factorCircuito() //(" Alta degradacion")
        let vueltas_neumaticos = 40 * this.circuito.factorCircuito();


        return Math.min(vueltas_duracion,vueltas_Combus,vueltas_neumaticos);
    }

    /**
     * Realiza la clasificación (Q1, Q2, Q3) y asigna posiciones de salida
     * @returns {Object} Resultados de la clasificación
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const clasificacion = carrera.realizarClasificacion();
     * // Returns: {
     * //   q1: [{ piloto: "Hamilton", tiempo: "1:12.345" }, ...],
     * //   q2: [{ piloto: "Verstappen", tiempo: "1:11.234" }, ...],
     * //   q3: [{ piloto: "Leclerc", tiempo: "1:10.123" }, ...],
     * //   posicionesSalida: [{ piloto: "Leclerc", posicion: 1 }, ...]
     * // }
     */
    realizarClasificacion() {

     autosParticipantes.forEach(autoActual => {
         const resultadosQ1 = autosParticipantes.map(auto => {
         return {
            nombre: auto.conductor.nombre,
            tiempo: auto.conductor.tiempoVuelta() // se asume que esto devuelve un número
         };
    });
     });
        this.clasificacion = {
            q1: resultadosQ1,
            q2: [],
            q3: []
        };
        
        return this.clasificacion;
    }


    //realizarClasificacion() {
    // 1. Obtener tiempos de vuelta de todos los autos
    //const resultadosQ1 = autosParticipantes.map(auto => {
    //    return {
    //        nombre: auto.conductor.nombre,
    //        tiempo: auto.conductor.tiempoVuelta() // se asume que esto devuelve un número
    //    };
    //});

    // 2. Ordenar de menor a mayor tiempo (mejor a peor)
    //resultadosQ1.sort((a, b) => a.tiempo - b.tiempo);

    // 3. Dividir en clasificados y eliminados
    //const clasificadosQ1 = resultadosQ1.slice(0, 15); // los 15 mejores
    //const eliminadosQ1 = resultadosQ1.slice(15); // los 5 eliminados

    // 4. Guardar resultados en la estructura de clasificación
    //this.clasificacion = {
    //    q1: resultadosQ1,   // Todos ordenados por tiempo
    //    q2: [],              // Aquí luego irán los mejores 15
    //    q3: []               // Luego los mejores 10
    //};

    //return this.clasificacion;
    //}

    /**
     * Registra el tiempo de una vuelta para un auto específico
     * @param {Object} auto - Auto que completó la vuelta
     * @param {number} tiempo - Tiempo de la vuelta en segundos
     * @returns {Object} Información de la vuelta registrada
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const vuelta = carrera.registrarVuelta(autoHamilton, 85.432);
     * // Returns: {
     * //   numeroVuelta: 15,
     * //   piloto: "Hamilton",
     * //   tiempo: 85.432,
     * //   esVueltaRapida: false
     * // }
     */
    registrarVuelta(auto, tiempo) {
        // Implementar lógica para registrar una vuelta
    }

    /**
     * Finaliza la carrera y calcula los resultados finales
     * @returns {Object} Resultados finales de la carrera
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const resultados = carrera.finalizarCarrera();
     * // Returns: {
     * //   podio: [
     * //     { posicion: 1, piloto: "Leclerc", tiempo: "1:45:23.456" },
     * //     { posicion: 2, piloto: "Verstappen", tiempo: "+2.345" },
     * //     { posicion: 3, piloto: "Hamilton", tiempo: "+5.678" }
     * //   ],
     * //   vueltaRapida: { piloto: "Verstappen", tiempo: "1:10.123" },
     * //   puntos: [
     * //     { piloto: "Leclerc", puntos: 25 },
     * //     { piloto: "Verstappen", puntos: 18 },
     * //     { piloto: "Hamilton", puntos: 15 }
     * //   ]
     * // }
     */
    finalizarCarrera() {
        // Implementar lógica para finalizar la carrera
    }

    /**
     * Obtiene los resultados actuales de la carrera
     * @returns {Object} Resultados actuales
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const resultados = carrera.obtenerResultados();
     * // Returns: {
     * //   posiciones: [
     * //     { posicion: 1, piloto: "Leclerc", tiempo: "1:45:23.456" },
     * //     { posicion: 2, piloto: "Verstappen", tiempo: "+2.345" },
     * //     ...
     * //   ],
     * //   vueltasCompletadas: 45,
     * //   vueltasRestantes: 33,
     * //   estado: "en_progreso"
     * // }
     */
    obtenerResultados() {
        // Implementar lógica para obtener resultados
    }
}

module.exports = Carrera;