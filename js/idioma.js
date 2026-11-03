const traduccionesMTC = {

    // MENÚ
    "Inicio": "Home",
    "Trabajos": "Assignments",
    "Multimedia": "Multimedia",
    "Unidades": "Units",
    "Himno del IPN": "IPN Anthem",
    "Acerca de": "About",

    // ENCABEZADOS
    "Bienvenidos a MTC": "Welcome to MTC",
    "Trabajos": "Assignments",
    "Multimedia": "Multimedia",
    "Acerca del portal": "About the Portal",
    "Nuestro equipo": "Our Team",

    // INICIO
    "Este sitio web tiene como propósito presentar y organizar los trabajos realizados durante la materia de Herramientas Multimedia.":
        "This website aims to present and organize the assignments completed for the Multimedia Tools course.",

    "En este portal se podrán consultar actividades, trabajos, imágenes, videos, audios y diferentes recursos relacionados con la materia.":
        "This portal provides access to activities, assignments, images, videos, audio, and other resources related to the course.",

    // TRABAJOS
    "Selecciona el parcial correspondiente.":
        "Select the corresponding term.",

    "1er Parcial":
        "1st Term",

    "2do Parcial":
        "2nd Term",

    "3er Parcial":
        "3rd Term",

    "Trabajos correspondientes al primer parcial.":
        "Assignments for the first term.",

    "Trabajos correspondientes al segundo parcial.":
        "Assignments for the second term.",

    "Trabajos correspondientes al tercer parcial.":
        "Assignments for the third term.",


    "Ver":
        "View",

    "Descargar":
        "Download",

    // MULTIMEDIA
    "En esta sección podremos colocar imágenes, videos, audios y otros recursos multimedia.":
        "In this section, we can add images, videos, audio, and other multimedia resources.",

    "Imágenes":
        "Images",

    "Videos":
        "Videos",

    "Audios":
        "Audio",

    "Seleccionar imagen":
        "Choose image",

    "Seleccionar video":
        "Choose video",

    "Seleccionar audio":
        "Choose audio",

    // ACERCA DE
    "Este portal fue desarrollado como parte del proyecto de la materia de Herramientas Multimedia 2CV21.":
        "This portal was developed as part of the Multimedia Tools 2CV21 course project.",

    "MTC significa Multimedia, Tecnología y Ciencia.":
        "MTC stands for Multimedia, Technology and Science.",

    // BIENVENIDA
    "BIENVENIDOS":
        "WELCOME",

    "Bienvenidos a nuestra página web, este sitio web tiene como propósito presentar y organizar recursos realizados de la materia Herramientas Multimedia para que los alumnos sean capaces de estudiar para presentar examen extraordinario de la materia.":
        "Welcome to our website. Its purpose is to present and organize resources created for the Multimedia Tools course so that students can study for the course's make-up examination.",

    "Sean bienvenidos a MTC.":
        "Welcome to MTC.",

    // HIMNO
    "Himno del Instituto Politécnico Nacional":
        "Anthem of the National Polytechnic Institute",

    "En esta sección se podrá escuchar el Himno del Instituto Politécnico Nacional.":
        "In this section, you can listen to the anthem of the National Polytechnic Institute.",

    "Audio del Himno":
        "Anthem Audio",

    "Letra del Himno":
        "Anthem Lyrics",

    "Tu navegador no puede reproducir este audio.":
        "Your browser cannot play this audio.",

    // FOOTER
    "Proyecto escolar":
        "School Project",

    "Proyecto de Herramientas Multimedia 2CV21":
        "Multimedia Tools 2CV21 Project"
};


const traduccionesAtributos = {

    "Logo MTC":
        "MTC logo",

    "Escudo del IPN":
        "IPN emblem",

    "Escudo del Instituto Politécnico Nacional":
        "Emblem of the National Polytechnic Institute",

    "Foto del integrante":
        "Team member photo",

    "Foto de Cevallos Pajaro Axl":
        "Photo of Cevallos Pajaro Axl",

    "Foto de Dominguez Arias Alejandro":
        "Photo of Dominguez Arias Alejandro",

    "Foto de Nava Avila Oscar Issac":
        "Photo of Nava Avila Oscar Issac"
};


function normalizarTexto(texto) {
    return texto.replace(/\s+/g, " ").trim();
}


function cambiarIdioma(idioma) {

    document.documentElement.lang = idioma;


    /*
       TRADUCIR TEXTOS
    */

    document.querySelectorAll("body *").forEach(elemento => {

        // No tocar elementos que contienen otros elementos
        if (elemento.children.length !== 0)
            return;

        const textoActual = normalizarTexto(elemento.textContent);


        // Guardar texto original solamente una vez
        if (!elemento.dataset.textoOriginal) {
            elemento.dataset.textoOriginal = textoActual;
        }


        const textoOriginal = elemento.dataset.textoOriginal;


        if (idioma === "en") {

            if (traduccionesMTC[textoOriginal]) {

                elemento.textContent =
                    traduccionesMTC[textoOriginal];

            }

        } else {

            elemento.textContent =
                textoOriginal;

        }

    });


    /*
       TRADUCIR ALT DE IMÁGENES
    */

    document.querySelectorAll("img[alt]").forEach(img => {

        if (!img.dataset.altOriginal) {

            img.dataset.altOriginal = img.alt;

        }


        if (idioma === "en") {

            img.alt =
                traduccionesAtributos[img.dataset.altOriginal]
                || img.dataset.altOriginal;

        } else {

            img.alt =
                img.dataset.altOriginal;

        }

    });


    /*
       ACTUALIZAR BOTONES ES / EN
    */

    document.querySelectorAll(".selector-idioma button").forEach(boton => {

        const activo =
            boton.dataset.idioma === idioma;

        boton.classList.toggle(
            "idioma-activo",
            activo
        );

        boton.setAttribute(
            "aria-pressed",
            String(activo)
        );

    });


    /*
       GUARDAR IDIOMA
    */

    try {

        localStorage.setItem(
            "idiomaMTC",
            idioma
        );

    } catch (error) {}

}


/*
   INICIAR
*/

document.addEventListener("DOMContentLoaded", () => {


    /*
       USAR EL SELECTOR QUE YA EXISTE
       EN EL HTML.
    */

    const selector =
        document.querySelector(".selector-idioma");


    if (selector) {

        selector
            .querySelectorAll("button[data-idioma]")
            .forEach(boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        cambiarIdioma(
                            boton.dataset.idioma
                        );

                    }
                );

            });

    }


    /*
       RECUPERAR IDIOMA GUARDADO
    */

    let idioma = "es";


    try {

        idioma =
            localStorage.getItem("idiomaMTC")
            || "es";

    } catch (error) {}


    if (idioma !== "es" && idioma !== "en") {

        idioma = "es";

    }


    cambiarIdioma(idioma);

});