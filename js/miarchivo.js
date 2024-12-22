
// Objeto para representar un crédito
class Credito {
    constructor(monto, plazo, tasaInteres) {
        this.monto = monto;
        this.plazo = plazo;
        this.tasaInteres = tasaInteres;
        this.cuotaMensual = this.calcularCuotaMensual();
    }

    calcularCuotaMensual() {
        return ((this.monto * (1 + this.tasaInteres / 100)) / this.plazo).toFixed(2);
    }
}

// Array para almacenar créditos simulados
let historialCreditos = [];

// Función para agregar el crédito al historial visual
function actualizarHistorial() {
    const listaHistorial = document.getElementById("listaHistorial");
    listaHistorial.innerHTML = ""; // Limpiar lista
    historialCreditos.forEach((credito, index) => {
        const item = document.createElement("li");
        item.textContent = `#${index + 1} - Monto: $${credito.monto}, Plazo: ${credito.plazo} meses, Cuota: $${credito.cuotaMensual}`;
        listaHistorial.appendChild(item);
    });
}

// Función para mostrar los resultados de la búsqueda
function mostrarResultadosBusqueda(resultados) {
    const listaResultados = document.getElementById("resultadosBusqueda");
    listaResultados.innerHTML = ""; // Limpiar resultados
    resultados.forEach((credito, index) => {
        const item = document.createElement("li");
        item.textContent = `Resultado #${index + 1}: Monto: $${credito.monto}, Plazo: ${credito.plazo} meses, Cuota: $${credito.cuotaMensual}`;
        listaResultados.appendChild(item);
    });
}

// Función para manejar la simulación de crédito
function manejarSimulacion(event) {
    event.preventDefault(); // Evitar recarga de la página
    const monto = parseFloat(document.getElementById("monto").value);
    const plazo = parseInt(document.getElementById("plazo").value);
    const tasaInteres = 10; // Tasa de interés fija del 10%

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    const credito = new Credito(monto, plazo, tasaInteres);
    historialCreditos.push(credito);

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<h3>Resultado</h3>
        <p>Monto: $${credito.monto}</p>
        <p>Plazo: ${credito.plazo} meses</p>
        <p>Cuota Mensual: $${credito.cuotaMensual}</p>`;

    actualizarHistorial();
}

// Función para manejar la búsqueda en el historial
function manejarBusqueda(event) {
    event.preventDefault(); // Evitar recarga de la página
    const minMonto = parseFloat(document.getElementById("minMonto").value);
    const maxMonto = parseFloat(document.getElementById("maxMonto").value);

    if (isNaN(minMonto) || isNaN(maxMonto) || minMonto > maxMonto) {
        alert("Por favor, ingrese un rango válido.");
        return;
    }

    const resultados = historialCreditos.filter(
        (credito) => credito.monto >= minMonto && credito.monto <= maxMonto
    );

    mostrarResultadosBusqueda(resultados);
}

// Asociar eventos a los formularios
document.getElementById("simuladorForm").addEventListener("submit", manejarSimulacion);
document.getElementById("busquedaForm").addEventListener("submit", manejarBusqueda);
