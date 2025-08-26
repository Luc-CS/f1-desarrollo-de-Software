class Mecanico {
 constructor(nombre, especialidad, disponible) {
 this.nombre = nombre;
 this.especialidad = especialidad;
 this.disponible = disponible;
 }
}
const mecanicos = [
 new Mecanico("Luis", "Frenos", true),
 new Mecanico("Ana", "Motor", false),
 new Mecanico("Julián", "Electricidad", true),
 new Mecanico("Sofía", "Neumáticos", false),
 new Mecanico("Carlos", "Motor", true),
];

// Parte 1
function obtenerDisponibles(listaMecanicos) {



}
// Parte 2
function hayEspecialistaDisponible(listaMecanicos) {
 // ...
}
// Resultados esperados:
console.log(obtenerDisponibles(mecanicos));
// ➜ ["Luis", "Julián", "Carlos"]
console.log(hayEspecialistaDisponible(mecanicos));
// ➜ true