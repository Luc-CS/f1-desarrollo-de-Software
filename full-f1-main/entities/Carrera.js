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
        var resultadosQ1;
        
        autosParticipantes.forEach(autoActual => {
            resultadosQ1 = autosParticipantes.map(auto => {
                return {
                    nombre: auto.conductor.nombre,
                    tiempo: auto.conductor.tiempoVuelta() // se asume que esto devuelve un número
                };
            });
        });
        let resultadosQ1 = resultadosQ1.sort((a, b) => a.tiempo - b.tiempo);
        let resultadosQ2 = resultadosQ1.slice(0, 15); // los 15 mejores

        let resultadosQ3 = resultadosQ2.slice(0, 10); // los 5 eliminados
     
        this.clasificacion = {
            q1: resultadosQ1,
            q2: resultadosQ2,
            q3: resultadosQ3
        };

        this.resultados = resultadosQ1;
        return this.clasificacion, this.resultados;
    }
    
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
        
        this.numeroVueltas++;

        autosParticipantes.forEach(autoActual => {
            resultados = autosParticipantes.map(auto => {
                return {
                    nombre: auto.conductor.nombre,
                    tiempo: auto.conductor.tiempoVuelta() // se asume que esto devuelve un número
                };
            });
        });
        let esVueltaRapida = false;
        this.resultados.forEach(piloto =>{
            if(tiempo > piloto.tiempo){
                this.circuito.actualizarRecordVuelta(tiempo, auto.conductor.nombre);
                esVueltaRapida = true;
            }
        });
        

        let retorno = new Map();
            retorno.set("numeroVuelta: ", this.numeroVueltas);
            retorno.set("piloto: ", auto.conductor.nombre);
            retorno.set("tiempo: ",tiempo);
            retorno.set("esVueltaRapida: ",esVueltaRapida);

            return retorno;
    
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
        //El ganador de la carrera recibe 25 puntos, el segundo clasificado 18 puntos, el tercero 15 puntos,                                                     

    finalizarCarrera() {
        
        autosParticipantes.forEach(autoActual => {
            resultados = autosParticipantes.map(auto => {
                return {
                    nombre: auto.conductor.nombre,
                    tiempo: auto.conductor.tiempoVuelta() // se asume que esto devuelve un número
                };
            });
        });
        let resultados = resultados.sort((a, b) => a.tiempo - b.tiempo);
        let podio = resultados.slice(0, 3);

        let puntos = new Map();
            retorno.set("Primero", 25);
            retorno.set("Primero", this.piloto.nombre);
            retorno.set("Segundo", 18);
            retorno.set("Segundo", this.piloto.nombre);
            retorno.set("Tercero",15);
            retorno.set("Tercero", this.piloto.nombre);

        return podio, puntos, this.circuito.recordVuelta;
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
        autosParticipantes.forEach(autoActual => {
            resultados = autosParticipantes.map(auto => {
                return {
                    nombre: auto.conductor.nombre,
                    tiempo: auto.conductor.tiempoVuelta() // se asume que esto devuelve un número
                };
            });
        });
        let resultados = resultados.sort((a, b) => a.tiempo - b.tiempo);

        let vueltasCompletadas = this.numeroVueltas;
        let vueltasRestantes = this.calcularNumeroVueltas() - this.numeroVueltas;

        let estado = "proceso";
        
        if(vueltasCompletadas == this.calcularNumeroVueltas()){
            estado = "finalizado";
        }
        return resultados,vueltasCompletadas,vueltasRestantes,estado;
    }
}

module.exports = Carrera;