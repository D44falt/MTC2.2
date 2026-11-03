document.addEventListener("DOMContentLoaded", () => {
    const botonTema = document.getElementById("boton-tema");

    if (!botonTema) return;

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

    // Cargar el tema guardado
    try {
        const temaGuardado = localStorage.getItem("tema");

        if (temaGuardado === "oscuro") {
            document.body.classList.add("modo-oscuro");
        } else if (temaGuardado === "claro") {
            document.body.classList.remove("modo-oscuro");
        }
    } catch (error) {
        // Continúa funcionando si el almacenamiento está bloqueado.
    }

    actualizarBoton();

    // Cambiar el tema al pulsar el botón
    botonTema.addEventListener("click", () => {
        const modoOscuro = document.body.classList.toggle("modo-oscuro");

        try {
            localStorage.setItem("tema", modoOscuro ? "oscuro" : "claro");
        } catch (error) {
            // El cambio de tema sigue funcionando.
        }

        actualizarBoton();
    });
});