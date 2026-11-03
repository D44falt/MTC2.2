// VISOR DE PDF zzzZzZ


document.addEventListener("DOMContentLoaded", function () {
    const visor = document.getElementById("visor-pdf");
    const marco = document.getElementById("visor-marco");
    const titulo = document.getElementById("visor-titulo");
    const cerrar = document.getElementById("visor-cerrar");

    document.querySelectorAll(".ver-pdf").forEach(function (enlace) {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();

            // Nombre del trabajo como título del visor
            const trabajo = enlace.closest(".trabajo");
            const nombre = trabajo
                ? trabajo.querySelector("h4").textContent.trim()
                : "Documento";

            titulo.textContent = nombre;
            marco.src = enlace.getAttribute("href");
            visor.classList.remove("visor-oculto");
            visor.scrollIntoView({ behavior: "smooth" });
        });
    });

    cerrar.addEventListener("click", function () {
        marco.src = "";
        visor.classList.add("visor-oculto");
    });
});