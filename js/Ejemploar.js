
document.addEventListener("DOMContentLoaded", function () {
    var marcador = document.getElementById("marcador-hiro");
    var mensaje = document.getElementById("mensaje-marcador");

    marcador.addEventListener("markerFound", function () {
        mensaje.classList.add("oculto");
    });

    marcador.addEventListener("markerLost", function () {
        mensaje.classList.remove("oculto");
    });
});