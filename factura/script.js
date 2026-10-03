function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

function calcularDescuento(subtotal) {
    return subtotal * 0.10;
}

function calcularIVA(subtotal) {
    return subtotal * 0.19;
}

function calcularNeto(subtotal, descuento, iva) {
    return subtotal - descuento + iva;
}

function calcularFactura(precio, cantidad) {
    const subtotal = calcularSubtotal(precio, cantidad);
    const descuento = calcularDescuento(subtotal);
    const iva = calcularIVA(subtotal);
    const neto = calcularNeto(subtotal, descuento, iva);

    return { subtotal, descuento, iva, neto };
}

const formulario = document.getElementById('formulario-factura');
const resultado = document.getElementById('resultado');
const mensajeError = document.getElementById('mensaje-error');
const formatoMoneda = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 2
});

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const producto = document.getElementById('producto').value.trim();
    const precio = Number(document.getElementById('precio').value);
    const cantidad = Number(document.getElementById('cantidad').value);

    if (!producto || !Number.isFinite(precio) || precio < 0 || !Number.isInteger(cantidad) || cantidad < 1) {
        mensajeError.textContent = 'Ingresa un producto, un precio válido y una cantidad entera mayor que cero.';
        resultado.hidden = true;
        return;
    }

    mensajeError.textContent = '';
    const totales = calcularFactura(precio, cantidad);
    document.getElementById('nombre-producto').textContent = producto;
    document.getElementById('detalle-producto').textContent = `${cantidad} unidad${cantidad === 1 ? '' : 'es'} × ${formatoMoneda.format(precio)}`;
    document.getElementById('total-producto').textContent = formatoMoneda.format(totales.subtotal);
    document.getElementById('subtotal').textContent = formatoMoneda.format(totales.subtotal);
    document.getElementById('descuento').textContent = `− ${formatoMoneda.format(totales.descuento)}`;
    document.getElementById('iva').textContent = formatoMoneda.format(totales.iva);
    document.getElementById('neto').textContent = formatoMoneda.format(totales.neto);
    resultado.hidden = false;
});

formulario.addEventListener('reset', function() {
    resultado.hidden = true;
    mensajeError.textContent = '';
});