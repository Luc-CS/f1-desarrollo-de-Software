const Auto = require('./entities/Auto');
const Piloto = require('./entities/Piloto');
const Escuderia = require('./entities/Escuderia');
const Carrera = require('./entities/Carrera');
const Circuito = require('./entities/Circuito');
const Estrategia = require('./entities/Estrategia');



try {
    // Crear circuito con condiciones climáticas
    const circuito = new Circuito('Monza', 'Italia', 5.793);
    circuito.establecerCondicionesClimaticas('soleado', 25, 50);
    circuito.agregarZonaDRS('Recta principal', 1000);
    circuito.agregarZonaDRS('Curva Parabolica', 800);

    // Agregar curvas al circuito
    circuito.agregarCurva('Curva 1', 250, 'alta');
    circuito.agregarCurva('Curva 2', 180, 'media');
    circuito.agregarCurva('Curva 3', 80, 'baja');

    // Crear escuderías con presupuesto y desarrollo
    const escuderia1 = new Escuderia('Ferrari', 'Italia', 400000000);
    const escuderia2 = new Escuderia('Mercedes', 'Alemania', 450000000);

    // Invertir en desarrollo
    escuderia1.invertirEnDesarrollo('motor', 50000000);
    escuderia2.invertirEnDesarrollo('aerodinámica', 60000000);

    // Crear autos con sistema de desgaste
    const auto1 = new Auto(16, 'Ferrari', 'SF21', 'blandos', 340, 100);
    const auto2 = new Auto(55, 'Ferrari', 'SF21', 'medios', 338, 100);
    const auto3 = new Auto(44, 'Mercedes', 'W12', 'blandos', 342, 100);
    const auto4 = new Auto(77, 'Mercedes', 'W12', 'duros', 341, 100);

    // Configurar desgaste inicial
    [auto1, auto2, auto3, auto4].forEach(auto => {
        auto.configurarDesgasteInicial({
            neumaticos: 100,
            combustible: 100,
            motor: 100
        });
    });

    // Crear pilotos con habilidades
    const piloto1 = new Piloto('Charles Leclerc', 'Mónaco', 0);
    const piloto2 = new Piloto('Carlos Sainz', 'España', 0);
    const piloto3 = new Piloto('Lewis Hamilton', 'Reino Unido', 0);
    const piloto4 = new Piloto('Valtteri Bottas', 'Finlandia', 0);

    // Configurar habilidades de los pilotos
    [piloto1, piloto2, piloto3, piloto4].forEach(piloto => {
        piloto.establecerHabilidades({
            velocidad: Math.floor(Math.random() * 100),
            consistencia: Math.floor(Math.random() * 100),
            agresividad: Math.floor(Math.random() * 100)
        });
    });

    // Asignar pilotos a autos
    piloto1.conducirAuto(auto1);
    piloto2.conducirAuto(auto2);
    piloto3.conducirAuto(auto3);
    piloto4.conducirAuto(auto4);

    // Crear estrategias de carrera
    const estrategiaFerrari = new Estrategia(
        2,
        ['blandos', 'medios'],
        [20, 40],
        80
    );

    const estrategiaMercedes = new Estrategia(
        3,
        ['blandos', 'medios', 'duros'],
        [15, 30, 45],
        70
    );

    // Crear carrera
    const carrera = new Carrera('Gran Premio de Italia', circuito, '2024-09-08');

    // Realizar clasificación
    console.log('\nResultados de la Clasificación:');
    carrera.realizarClasificacion();

    // Iniciar carrera
    carrera.iniciarCarrera();

    // Mostrar resultados finales
    console.log('\nResultados finales de la carrera:');
    carrera.finalizarCarrera();

    // Mostrar estadísticas de desgaste final
    console.log('\nEstadísticas de desgaste final:');
    [auto1, auto2, auto3, auto4].forEach(auto => {
        const desgaste = auto.obtenerEstadisticasDesgaste() || {
            neumaticos: 0,
            combustible: 0,
            motor: 0
        };
        console.log(`Auto #${auto.numero}:`);
        console.log(`- Desgaste neumáticos: ${desgaste.neumaticos}%`);
        console.log(`- Combustible restante: ${desgaste.combustible}%`);
        console.log(`- Estado del motor: ${desgaste.motor}%`);
    });

    // Mostrar puntos por escudería
    console.log('\nPuntos por escudería:');
    const stats1 = escuderia1.obtenerEstadisticas() || { puntosCampeonato: 0 };
    const stats2 = escuderia2.obtenerEstadisticas() || { puntosCampeonato: 0 };
    console.log(`${escuderia1.nombre}: ${stats1.puntosCampeonato} puntos`);
    console.log(`${escuderia2.nombre}: ${stats2.puntosCampeonato} puntos`);

    // Mostrar estadísticas de pilotos
    console.log('\nEstadísticas de pilotos:');
    [piloto1, piloto2, piloto3, piloto4].forEach(piloto => {
        const stats = piloto.obtenerEstadisticas() || {
            puntosCampeonato: 0,
            vueltasRapidas: 0,
            podios: 0
        };
        console.log(`${piloto.nombre}:`);
        console.log(`- Puntos en el campeonato: ${stats.puntosCampeonato}`);
        console.log(`- Vueltas rápidas: ${stats.vueltasRapidas}`);
        console.log(`- Podios: ${stats.podios}`);
    });

} catch (error) {
    console.error('Error durante la ejecución:', error.message);
}