
document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
});

function calcularCredito(monto, plazo) {
    const tasaInteres = 0.02;
    const cuota = (monto * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazo));
    return cuota.toFixed(2);
}

document.getElementById('simuladorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const monto = parseFloat(document.getElementById('monto').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    const resultado = calcularCredito(monto, plazo);

    document.getElementById('resultado').innerHTML = `<h2>Resultado</h2><p>Cuota mensual: $${resultado}</p>`;
    guardarEnHistorial({ monto, plazo, resultado });
});

function guardarEnHistorial(credito) {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(credito);
    localStorage.setItem('historial', JSON.stringify(historial));
    mostrarHistorial();
}

function cargarHistorial() {
    mostrarHistorial();
}

function mostrarHistorial() {
    const historialLista = document.getElementById('listaHistorial');
    historialLista.innerHTML = '';
    let historial = JSON.parse(localStorage.getItem('historial')) || [];

    historial.forEach((credito) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Monto:</strong> $${credito.monto} - 
                            <strong>Plazo:</strong> ${credito.plazo} meses - 
                            <strong>Cuota:</strong> $${credito.resultado}`;
        historialLista.appendChild(listItem);
    });
}

document.getElementById('buscarCredito').addEventListener('input', () => {
    const valor = parseFloat(document.getElementById('buscarCredito').value);
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    const historialLista = document.getElementById('listaHistorial');
    historialLista.innerHTML = '';

    historial.filter(credito => credito.monto >= valor).forEach(credito => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Monto:</strong> $${credito.monto} - 
                            <strong>Plazo:</strong> ${credito.plazo} meses - 
                            <strong>Cuota:</strong> $${credito.resultado}`;
        historialLista.appendChild(listItem);
    });
});

document.getElementById('ordenarCredito').addEventListener('click', () => {
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.sort((a, b) => a.monto - b.monto);
    localStorage.setItem('historial', JSON.stringify(historial));
    mostrarHistorial();
});