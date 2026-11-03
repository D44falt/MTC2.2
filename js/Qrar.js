// QR DE REALIDAD AUMENTADA


document.addEventListener("DOMContentLoaded", function () {

    var URL_PUBLICA = "https://d44falt.github.io/MTC2.2/Ejemploar.html";

    var destino = URL_PUBLICA || new URL("ejemploAR.html", window.location.href).href;

    var contenedorQR = document.getElementById("qr-ra-codigo");
    var enlace = document.getElementById("qr-ra-enlace");
    var aviso = document.getElementById("qr-ra-aviso");

    new QRCode(contenedorQR, {
        text: destino,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });

    enlace.href = destino;
    enlace.textContent = destino;

    // Avisar si se abrió en local xd
    var host = window.location.hostname;
    var esLocal = window.location.protocol === "file:" ||
                  host === "localhost" ||
                  host === "127.0.0.1";

    if (esLocal && !URL_PUBLICA) {
        aviso.style.display = "block";
    }
});