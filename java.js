// 1. Importamos Luxon localmente
import { DateTime } from "luxon";

// 2. Importamos Flatpickr localmente (desde node_modules)
import flatpickr from "flatpickr";
// Importamos el idioma español
import { Spanish } from "flatpickr/dist/l10n/es.js";

// Seleccionamos los elementos del HTML
const inputFecha = document.getElementById("fechaNacimiento");
const btnCalcular = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");
const textoEdad = document.getElementById("textoEdad");
const mensajeError = document.getElementById("mensajeError");

// 3. Inicializamos el Datepicker Externo
const datepicker = flatpickr(inputFecha, {
    locale: Spanish,           // Traducido al español
    dateFormat: "d/m/Y",       // Formato Día/Mes/Año
    maxDate: "today",          // No permite fechas futuras
    disableMobile: true,       // Fuerza el datepicker externo en celulares
    allowInput: false          // Bloquea la escritura manual
});

// 4. Función al dar clic en "Calcular"
btnCalcular.addEventListener("click", () => {
    mensajeError.textContent = "";
    
    const fechaSeleccionada = datepicker.selectedDates[0];

    // Validación 1
    if (!fechaSeleccionada) {
        mensajeError.textContent = "Por favor, selecciona una fecha válida.";
        resultado.style.display = "none";
        return;
    }

    const fechaNacimientoLuxon = DateTime.fromJSDate(fechaSeleccionada);
    const hoy = DateTime.now();

    // Validación 2 (Luxon)
    if (!fechaNacimientoLuxon.isValid) {
        mensajeError.textContent = "La fecha ingresada no es válida.";
        resultado.style.display = "none";
        return;
    }

    // 5. Cálculo exacto con Luxon
    const diferencia = hoy.diff(fechaNacimientoLuxon, ["years", "months", "days"]).toObject();

    const anios = Math.floor(diferencia.years);
    const meses = Math.floor(diferencia.months);
    const dias = Math.floor(diferencia.days);

    // 6. Mostramos el resultado
    if (anios === 0 && meses === 0) {
        textoEdad.textContent = `${dias} días`;
    } else if (anios === 0) {
        textoEdad.textContent = `${meses} meses y ${dias} días`;
    } else {
        textoEdad.textContent = `${anios} años y ${meses} meses`;
    }
    
    resultado.style.display = "block";
});