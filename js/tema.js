document.addEventListener("DOMContentLoaded", () => {

    const botonTema = document.getElementById("boton-tema");

    if (!botonTema) return;


    /* =========================================
       CONFIGURACIÓN INICIAL DEL TEMA
    ========================================= */

    let temaGuardado = null;

    try {
        temaGuardado = localStorage.getItem("tema");
    } catch (error) {
        // Si localStorage no está disponible, se utilizará el modo oscuro
    }

    // Si existe una preferencia guardada, se respeta
    // Si no existe, se establece el modo oscuro de manera predeterminada
    if (temaGuardado === "claro") {

        document.body.classList.remove("modo-oscuro");

    } else {

        document.body.classList.add("modo-oscuro");

        if (!temaGuardado) {
            try {
                localStorage.setItem("tema", "oscuro");
            } catch (error) {}
        }

    }


    /* =========================================
       ACTUALIZAR BOTÓN DE TEMA
    ========================================= */

    function actualizarBoton() {

        const modoOscuro = document.body.classList.contains("modo-oscuro");

        botonTema.setAttribute("aria-pressed", String(modoOscuro));

        botonTema.setAttribute(
            "aria-label",
            modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
        );

        botonTema.setAttribute(
            "title",
            modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
        );

    }


    /* =========================================
       CAMBIAR ENTRE MODO CLARO Y OSCURO
    ========================================= */

    actualizarBoton();

    botonTema.addEventListener("click", () => {

        const modoOscuro = document.body.classList.toggle("modo-oscuro");

        try {
            localStorage.setItem(
                "tema",
                modoOscuro ? "oscuro" : "claro"
            );
        } catch (error) {}

        actualizarBoton();

    });

});