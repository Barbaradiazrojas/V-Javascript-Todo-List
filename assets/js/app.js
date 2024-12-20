// Seleccionar elementos del DOM
const agregarBtn = document.getElementById("btn-agregar");
const tareaInput = document.getElementById("texto-tarea");
const tareasTabla = document.getElementById("tabla-datos");
const totalTareas = document.getElementById("tareas-total");
const realizadasTareas = document.getElementById("tareas-realizadas");

// Lista inicial de tareas
let tareasLista = [
    { id: 1, nombre: "Ver las clases", terminada: true },
    { id: 2, nombre: "Leer los documentos", terminada: true },
    { id: 3, nombre: "Trabajar", terminada: false },
    { id: 4, nombre: "Desarrollar proyecto", terminada: false },
    { id: 5, nombre: "Enviar Proyecto", terminada: false }
];

// Evento para agregar una nueva tarea
agregarBtn.addEventListener("click", () => {
    const nuevaTarea = { id: generarNuevoId(), nombre: tareaInput.value, terminada: false };
    tareasLista.push(nuevaTarea);
    tareaInput.value = "";
    actualizarTabla(tareasLista);
    mostrarResumen();
});

// Función para imprimir el estado del checkbox
const imprimirCheck = (estado) => estado ? "checked" : "";

// Función para construir la tabla de tareas
const actualizarTabla = (lista) => {
    const listaOrdenada = lista.sort((a, b) => a.id - b.id);
    let contenidoHtml = "";
    listaOrdenada.forEach(tarea => {
        contenidoHtml += `
            <tr class="fila-tarea" id="fila-${tarea.id}">
                <td>${tarea.id}</td>
                <td class="columna-nombre-tarea">${tarea.nombre}</td>
                <td><input type="checkbox" ${imprimirCheck(tarea.terminada)} onclick="cambiarEstadoTarea(${tarea.id})"></td>
                <td><i class="fa-solid fa-delete-left" onclick="eliminarTarea(${tarea.id}, true)"></i></td>
            </tr>
        `;
    });
    tareasTabla.innerHTML = contenidoHtml;
};

// Función para cambiar el estado de una tarea
window.cambiarEstadoTarea = (id) => {
    const tarea = tareasLista.find(t => t.id === id);
    tarea.terminada = !tarea.terminada;
    actualizarTabla(tareasLista);
    mostrarResumen();
};

// Función para eliminar una tarea
window.eliminarTarea = (id, actualizar = false) => {
    const indice = tareasLista.findIndex(t => t.id === id);
    tareasLista.splice(indice, 1);
    if (actualizar) {
        actualizarTabla(tareasLista);
        mostrarResumen();
    }
};

// Función para mostrar el resumen de tareas
const mostrarResumen = () => {
    const tareasRealizadas = tareasLista.filter(t => t.terminada).length;
    totalTareas.innerHTML = `Total: ${tareasLista.length}`;
    realizadasTareas.innerHTML = `Realizadas: ${tareasRealizadas}`;
};

// Función para generar un nuevo ID
const generarNuevoId = () => {
    return listaTareas.length === 0 ? 1 : Math.max(...tareasLista.map(t => t.id)) + 1;
};

// Inicializar la tabla y el resumen
actualizarTabla(tareasLista);
mostrarResumen();
