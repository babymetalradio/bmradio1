const params =
new URLSearchParams(
window.location.search
);

const temporada =
Number(
params.get("temporada")
);

fetch("conciertos.json")
.then(r => r.json())
.then(data => {

const episodios =
data.filter(
item =>
item.tipo === "Metaraji" &&
Number(item.temporada) === temporada
);

document.getElementById(
"tituloTemporada"
).textContent =
`📻 METARAJI - Temporada ${temporada}`;

const contenedor =
document.getElementById(
"episodios"
);

episodios.forEach(ep => {

contenedor.innerHTML += `

<div
class="card"
onclick="window.location.href='detalle.html?id=${ep.id}'">

<img
src="${ep.portada}"
alt="${ep.titulo}">

<div class="card-title">

Episodio ${ep.episodio}

</div>

</div>

`;

});

});