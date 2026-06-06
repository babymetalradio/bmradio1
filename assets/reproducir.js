console.log("JS cargado");

const params =
new URLSearchParams(window.location.search);

const id =
parseInt(params.get("id"));

console.log("ID:", id);
const params =
new URLSearchParams(window.location.search);

const id =
parseInt(params.get("id"));

fetch("conciertos.json")
.then(r => r.json())
.then(data => {

    const c =
    data.find(x => Number(x.id) === Number(id));

    if(!c){

        document.getElementById("titulo")
        .textContent =
        "Contenido no encontrado";

        return;
    }

    document.getElementById("player")
    .innerHTML = `
    <iframe
    src="${c.embed}"
    allowfullscreen>
    </iframe>
    `;

    document.getElementById("titulo")
    .textContent = c.titulo;

    document.getElementById("info")
    .innerHTML = `
    ${c.artista} •
    ${c.pais} •
    ${c.anio} •
    ${c.duracion}
    `;

    document.getElementById("sinopsis")
    .innerHTML = `
    <h3>Sinopsis</h3>
    <p>${c.sinopsis || "Sinopsis no disponible."}</p>
    `;

    localStorage.setItem(
        "ultimoConcierto",
        JSON.stringify(c)
    );

})
.catch(error => {

    console.error(error);

    document.getElementById("titulo")
    .textContent =
    "Error cargando contenido";

});