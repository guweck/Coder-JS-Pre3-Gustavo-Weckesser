// Referencias a los elementos del DOM
const nombreTarea = document.getElementById('nombreTarea');
const prioridadTarea = document.getElementById('prioridadTarea');
const botonAgregar = document.getElementById('botonAgregar');
const listaTareas = document.getElementById('listaTareas');
const filtroPrioridad = document.getElementById('filtroPrioridad');
const filtroCondicion = document.getElementById('filtroCondicion');

// Array para almacenar las tareas
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Evento para agregar tareas
botonAgregar.addEventListener('click', () => agregarTarea());

// Eventos para aplicar los filtros al cambiar sus valores
filtroPrioridad.addEventListener('change', () => aplicarFiltros());
filtroCondicion.addEventListener('change', () => aplicarFiltros());

// Función para agregar una nueva tarea
function agregarTarea() {
    if (nombreTarea.value.trim() === '') {
        alert('Por favor ingresa un nombre para la tarea.');
        return;
    }

    const nuevaTarea = {
        nombre: nombreTarea.value.trim(),
        prioridad: prioridadTarea.value,
        completada: false,
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    aplicarFiltros();  // Actualiza la lista según los filtros activos
    nombreTarea.value = '';
}

// Función para guardar tareas en LocalStorage usando JSON
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para aplicar los filtros activos
function aplicarFiltros() {
    const filtroP = filtroPrioridad.value;
    const filtroC = filtroCondicion.value;

    let tareasFiltradas = tareas;

    if (filtroP !== 'todas') {
        tareasFiltradas = tareasFiltradas.filter(tarea => tarea.prioridad === filtroP);
    }

    if (filtroC === 'completas') {
        tareasFiltradas = tareasFiltradas.filter(tarea => tarea.completada);
    } else if (filtroC === 'pendientes') {
        tareasFiltradas = tareasFiltradas.filter(tarea => !tarea.completada);
    }

    renderizarTareas(tareasFiltradas);
}

// Función para renderizar las tareas en el DOM
function renderizarTareas(lista) {
    listaTareas.innerHTML = '';  // Limpia la lista antes de renderizar
    lista.forEach((tarea, indice) => {
        const elemento = document.createElement('li');
        elemento.className = `tarea ${tarea.prioridad} ${tarea.completada ? 'completada' : ''}`;
        elemento.innerHTML = `
            <span>${tarea.nombre}</span>
            <button onclick="alternarEstado(${indice})">
                ${tarea.completada ? 'Desmarcar' : 'Completar'}
            </button>
            <button onclick="eliminarTarea(${indice})">Eliminar</button>
        `;
        listaTareas.appendChild(elemento);
    });
}

// Función para alternar el estado de una tarea (completada o pendiente)
function alternarEstado(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    guardarTareas();
    aplicarFiltros();  // Actualiza la lista según los filtros activos
}

// Función para eliminar una tarea
function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    guardarTareas();
    aplicarFiltros();  // Actualiza la lista según los filtros activos
}

// Mostrar las tareas al cargar la página aplicando los filtros activos
aplicarFiltros();
