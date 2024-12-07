
// Función para calcular las cuotas
function calcularCuotas(monto, plazo, tasaInteres) {
    let cuotaMensual = (monto * (1 + (tasaInteres / 100))) / plazo;
    return cuotaMensual.toFixed(2);
}

// Función principal del simulador
function simuladorCredito() {
    // Pedir datos al usuario
    let monto = parseFloat(prompt("Ingrese el monto del crédito (en pesos):"));
    let plazo = parseInt(prompt("Ingrese el plazo en meses (6, 12, 24, 36):"));
    const tasaInteres = 10; // Tasa de interés fija del 10%

    // Validar entrada
    if (isNaN(monto) || monto <= 0 || ![6, 12, 24, 36].includes(plazo)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    // Calcular la cuota mensual
    let cuotaMensual = calcularCuotas(monto, plazo, tasaInteres);

    // Mostrar resultado
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `
        <h2>Resultado</h2>
        <p>Monto del crédito: $${monto}</p>
        <p>Plazo: ${plazo} meses</p>
        <p>Tasa de interés: ${tasaInteres}%</p>
        <p>Cuota mensual: $${cuotaMensual}</p>
    `;
}

// Evento para iniciar el simulador
document.getElementById("iniciarSimulador").addEventListener("click", simuladorCredito);
