
//CARRUSEL

document.querySelectorAll(".carrusel").forEach((carrusel) => {

    // Obtener las tarjetas.
    const tarjetas = [
        ...carrusel.querySelectorAll(
            ".carrusel-lista .carrusel-tarjeta"
        )
    ];

    // Obtener controles.
    const titulo = carrusel.querySelector(".carrusel-titulo");
    const anterior = carrusel.querySelector(".carrusel-anterior");
    const siguiente = carrusel.querySelector(".carrusel-siguiente");

    // Índice de la tarjeta central.
    let actual = 0;

    // Evitar errores si no existen tarjetas.
    if (tarjetas.length === 0) return;


    /* =====================================
       ACTUALIZAR POSICIONES
    ===================================== */

    function mostrar(indice) {

        // Navegación circular.
        actual = (indice + tarjetas.length) % tarjetas.length;

        tarjetas.forEach((tarjeta, i) => {

            let posicion = i - actual;

            // Ajustar posiciones al llegar a los extremos.
            if (posicion > tarjetas.length / 2) {
                posicion -= tarjetas.length;
            }

            if (posicion < -tarjetas.length / 2) {
                posicion += tarjetas.length;
            }

            // Limpiar clases anteriores.
            tarjeta.classList.remove(
                "tarjeta-activa",
                "tarjeta-izquierda",
                "tarjeta-derecha",
                "tarjeta-oculta"
            );

            // Asignar la posición correspondiente.
            if (posicion === 0) {

                tarjeta.classList.add("tarjeta-activa");

            } else if (posicion === -1) {

                tarjeta.classList.add("tarjeta-izquierda");

            } else if (posicion === 1) {

                tarjeta.classList.add("tarjeta-derecha");

            } else {

                tarjeta.classList.add("tarjeta-oculta");

            }

            // Accesibilidad.
            tarjeta.setAttribute(
                "aria-current",
                posicion === 0 ? "true" : "false"
            );

            tarjeta.tabIndex = posicion === 0 ? 0 : -1;

        });

        // Actualizar título.
        const nombre = tarjetas[actual]
            .querySelector("h4")
            .textContent
            .trim();

        titulo.textContent =
            `${nombre} (${actual + 1} de ${tarjetas.length})`;

    }


    /* =====================================
       BOTÓN ANTERIOR
    ===================================== */

    anterior.addEventListener("click", () => {
        mostrar(actual - 1);
    });


    /* =====================================
       BOTÓN SIGUIENTE
    ===================================== */

    siguiente.addEventListener("click", () => {
        mostrar(actual + 1);
    });


    /* =====================================
       CLIC EN LAS TARJETAS
    ===================================== */

    tarjetas.forEach((tarjeta, indice) => {

        tarjeta.addEventListener("click", (evento) => {

            // Si la tarjeta no está en el centro,
            // primero la colocamos al frente.
            if (indice !== actual) {

                evento.preventDefault();

                mostrar(indice);

            }

            // Si ya está en el centro,
            // permite abrir su enlace HTML original.

        });

    });


    /* =====================================
       FLECHAS DEL TECLADO
    ===================================== */

    document.addEventListener("keydown", (evento) => {

        // No interferir cuando se escribe en un campo.
        const elemento = evento.target;

        if (
            elemento.matches("input, textarea, select") ||
            elemento.isContentEditable
        ) {
            return;
        }

        // Solo controlar el carrusel si está visible.
        const rectangulo = carrusel.getBoundingClientRect();

        const visible =
            rectangulo.bottom > 0 &&
            rectangulo.top < window.innerHeight;

        if (!visible) return;

        // Flecha izquierda: tarjeta anterior.
        if (evento.key === "ArrowLeft") {

            evento.preventDefault();

            mostrar(actual - 1);

        }

        // Flecha derecha: tarjeta siguiente.
        if (evento.key === "ArrowRight") {

            evento.preventDefault();

            mostrar(actual + 1);

        }

    });


    /* =====================================
       INICIALIZAR CARRUSEL
    ===================================== */

    mostrar(0);

});
