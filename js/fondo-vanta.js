
// CONFIGURACIÓN DEL FONDO VANTA

let efectoVanta = null;

// Colores para cada tema
const configuracionTemas = {

    claro: {
        color: 0x9aafa3,
        backgroundColor: 0xffffff
    },

    oscuro: {
        color: 0x278b65,
        backgroundColor: 0x000000
    }

};


// DETECTAR EL TEMA ACTUAL

function obtenerTemaActual() {

    const modoOscuro =
        document.body.classList.contains("modo-oscuro") ||
        document.documentElement.classList.contains("modo-oscuro");

    return modoOscuro ? "oscuro" : "claro";

}


// INICIALIZAR VANTA


function iniciarVanta() {

    const contenedor = document.querySelector("#fondo-vanta");

    if (!contenedor || !window.VANTA) {
        return;
    }

    // Eliminar instancia anterior
    if (efectoVanta) {
        efectoVanta.destroy();
        efectoVanta = null;
    }

    const tema = obtenerTemaActual();
    const colores = configuracionTemas[tema];

    // Crear nuevo fondo
    efectoVanta = VANTA.NET({

        el: contenedor,

        mouseControls: true,
        touchControls: true,
        gyroControls: false,

        minHeight: 200.00,
        minWidth: 200.00,

        scale: 1.00,
        scaleMobile: 1.00,

        color: colores.color,
        backgroundColor: colores.backgroundColor,

        points: 10.00,
        maxDistance: 20.00,
        spacing: 18.00,

        showDots: false

    });

}


//DETECTAR CAMBIOS DE TEMA

function observarCambiosDeTema() {

    const observador = new MutationObserver(() => {

        iniciarVanta();

    });

    const opciones = {
        attributes: true,
        attributeFilter: ["class"]
    };

    observador.observe(document.body, opciones);
    observador.observe(document.documentElement, opciones);

}


//INICIAR CUANDO CARGUE LA PÁGINA

document.addEventListener("DOMContentLoaded", () => {

    iniciarVanta();
    observarCambiosDeTema();

});

