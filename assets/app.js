let conciertos = [];

document.addEventListener("DOMContentLoaded", () => {

    fetch("conciertos.json")
    .then(response => response.json())
    .then(data => {

        conciertos = data;

        if(conciertos.length === 0){

            document.getElementById("contenido").innerHTML =
            "<div class='section'><h2>No hay conciertos disponibles</h2></div>";

            return;
        }

        crearBanner();
        crearCategorias();
        cargarContinuar();
        iniciarBuscador();

    })
    .catch(error => {

        console.error(error);

        document.getElementById("contenido").innerHTML =
        "<div class='section'><h2>Error cargando conciertos.json</h2></div>";

    });

});

function crearBanner(){

    const c = conciertos[0];

    document.getElementById("banner").innerHTML = `
        <div class="banner" style="background-image:url('${c.banner}')">
            <div class="banner-content">
                <h1>${c.titulo}</h1>
                <p>${c.descripcion}</p>

                <a class="btn"
                   href="reproducir.html?id=${c.id}">
                   ▶ Reproducir
                </a>
            </div>
        </div>
    `;
}

function crearCategorias(){

    const contenido =
    document.getElementById("contenido");

    contenido.innerHTML = "";

    /* TIPOS */

    const tipos =
    [...new Set(conciertos.map(x => x.tipo))];

    tipos.forEach(tipo => {

        const lista =
        conciertos.filter(x => x.tipo === tipo);

        let html = `
        <div class="section">
            <h2>${tipo}s</h2>
            <div class="row">
        `;

        lista.forEach(item => {

            html += `
            <div class="card"
                 onclick="abrir(${item.id})">

                <img src="${item.portada}"
                     alt="${item.titulo}"
                     loading="lazy">

                <div class="card-title">
                    ${item.titulo}
                </div>

            </div>
            `;
        });

        html += `
            </div>
        </div>
        `;

        contenido.innerHTML += html;

    });

    /* PAÍSES */

    const paises =
    [...new Set(conciertos.map(x => x.pais))];

    paises.forEach(pais => {

        const lista =
        conciertos.filter(x => x.pais === pais);

        let html = `
        <div class="section">
            <h2>${pais}</h2>
            <div class="row">
        `;

        lista.forEach(item => {

            html += `
            <div class="card"
                 onclick="abrir(${item.id})">

                <img src="${item.portada}"
                     alt="${item.titulo}"
                     loading="lazy">

                <div class="card-title">
                    ${item.titulo}
                </div>

            </div>
            `;
        });

        html += `
            </div>
        </div>
        `;

        contenido.innerHTML += html;

    });

}

function abrir(id){

    const concierto =
    conciertos.find(x => x.id === id);

    if(!concierto) return;

    localStorage.setItem(
        "ultimoConcierto",
        JSON.stringify(concierto)
    );

    window.location.href =
    `reproducir.html?id=${id}`;

}

function cargarContinuar(){

    const ultimo =
    localStorage.getItem("ultimoConcierto");

    if(!ultimo) return;

    const c = JSON.parse(ultimo);

    document.getElementById("continuar").innerHTML = `
        <div class="card"
             onclick="abrir(${c.id})">

            <img src="${c.portada}"
                 alt="${c.titulo}">

            <div class="card-title">
                ${c.titulo}
            </div>

        </div>
    `;
}

function iniciarBuscador(){

    const buscador =
    document.getElementById("buscar");

    if(!buscador) return;

    buscador.addEventListener("input", e => {

        const texto =
        e.target.value.toLowerCase();

        document
        .querySelectorAll(".card")
        .forEach(card => {

            card.style.display =
            card.innerText
            .toLowerCase()
            .includes(texto)
            ? "block"
            : "none";

        });

    });

}

/* FAVORITOS */

function obtenerFavoritos(){

    return JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];

}

function agregarFavorito(id){

    let favoritos =
    obtenerFavoritos();

    if(!favoritos.includes(id)){

        favoritos.push(id);

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

    }

}

function eliminarFavorito(id){

    let favoritos =
    obtenerFavoritos();

    favoritos =
    favoritos.filter(f => f !== id);

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

}
