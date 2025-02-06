
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

// Función para actualizar el historial dinámicamente en el DOM
function actualizarHistorial() {
    const listaHistorial = document.getElementById("listaHistorial");
    listaHistorial.innerHTML = "";
    historialCreditos.forEach((credito, index) => {
        const item = document.createElement("li");
        item.textContent = `#${index + 1} - Monto: $${credito.monto}, Plazo: ${credito.plazo} meses, Cuota: $${credito.cuotaMensual}`;
        listaHistorial.appendChild(item);
    });
}

// Función para manejar la simulación de crédito
function manejarSimulacion(event) {
    event.preventDefault();
    const monto = parseFloat(document.getElementById("monto").value);
    const plazo = parseInt(document.getElementById("plazo").value);
    const tasaInteres = 10;

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
    event.preventDefault();
    const minMonto = parseFloat(document.getElementById("minMonto").value);
    const maxMonto = parseFloat(document.getElementById("maxMonto").value);

    if (isNaN(minMonto) || isNaN(maxMonto) || minMonto > maxMonto) {
        alert("Por favor, ingrese un rango válido.");
        return;
    }

    const resultados = historialCreditos.filter(
        (credito) => credito.monto >= minMonto && credito.monto <= maxMonto
    );

    const listaResultados = document.getElementById("resultadosBusqueda");
    listaResultados.innerHTML = "";
    resultados.forEach((credito, index) => {
        const item = document.createElement("li");
        item.textContent = `Resultado #${index + 1}: Monto: $${credito.monto}, Plazo: ${credito.plazo} meses, Cuota: $${credito.cuotaMensual}`;
        listaResultados.appendChild(item);
    });
}

// Función para cargar datos desde una API externa
async function cargarDatosAPI() {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        const listaDatos = document.getElementById("listaDatos");
        listaDatos.innerHTML = "";

        Object.entries(data.rates).slice(0, 5).forEach(([moneda, tasa]) => {
            const item = document.createElement("li");
            item.textContent = `1 USD = ${tasa} ${moneda}`;
            listaDatos.appendChild(item);
        });

        alert("Datos de mercado financiero cargados con éxito.");
    } catch (error) {
        alert("Error al cargar los datos de la API.");
    }
}

// Asociar eventos a los formularios y botones
document.getElementById("simuladorForm").addEventListener("submit", manejarSimulacion);
document.getElementById("busquedaForm").addEventListener("submit", manejarBusqueda);
document.getElementById("cargarDatos").addEventListener("click", cargarDatosAPI);