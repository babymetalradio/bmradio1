const params =
new URLSearchParams(
window.location.search
);

const id =
parseInt(
params.get("id")
);
let listaMetaraji = [];
let episodioActual = null;

fetch("conciertos.json")
.then(response => response.json())
.then(data => {

const concierto =
data.find(
x => Number(x.id) === Number(id)
);


if(!concierto){

document.getElementById(
"detalle"
).innerHTML =
"<h2>Concierto no encontrado</h2>";

return;

}

if(concierto.tipo === "Metaraji"){

listaMetaraji =
data
.filter(
x =>
x.tipo === "Metaraji" &&
x.temporada === concierto.temporada
)
.sort(
(a,b) =>
a.episodio - b.episodio
);

episodioActual =
concierto;

}

document.getElementById(
"detalle"
).innerHTML = `

<div class="detalle-banner"
style="
background-image:url('${concierto.banner}');
">

<div class="detalle-overlay">

<h1>
${concierto.titulo}
</h1>
<div class="detalle-tags">

<span class="tag">
🎤 ${concierto.artista}
</span>

<span class="tag">
🎬 ${concierto.tipo}
</span>

<span class="tag">
🌎 ${concierto.pais}
</span>

<span class="tag">
📅 ${concierto.anio}
</span>

</div>
<div class="detalle-tags">

<span class="tag">
🎤 ${concierto.artista}
</span>

<span class="tag">
🎬 ${concierto.tipo}
</span>

<span class="tag">
🌎 ${concierto.pais}
</span>

<span class="tag">
📅 ${concierto.anio}
</span>

</div>

<p>

📅 ${concierto.anio}
&nbsp;&nbsp;

🌎 ${concierto.pais}
&nbsp;&nbsp;

⏱ ${concierto.duracion}

</p>

<p>

${concierto.descripcion}

</p>
<div class="detalle-botones">

<a
class="btn"
href="reproducir.html?id=${concierto.id}">

▶ Reproducir

</a>

${concierto.tipo === "Metaraji" ? `

<button
class="btn"
onclick="episodioAnterior()">

⏮ Anterior

</button>

<button
class="btn"
onclick="episodioSiguiente()">

Siguiente ⏭

</button>

` : ""}

<button
id="btnFavorito"
class="btn-favorito"
onclick="toggleFavorito(${concierto.id})">

❤️ Mi Lista

</button>

</div>

</div>

</div>
<div
class="detalle-content"

style="
background-image:
url('${concierto.banner}');
">
<div class="detalle-poster-container">

<img
class="detalle-poster"
src="${concierto.portada}"
alt="${concierto.titulo}">

</div>

<div class="detalle-info">

<h2>
Sinopsis
</h2>

<p>
${concierto.sinopsis}
</p>

${concierto.trailer ? `

<div class="trailer-section">

<h3>
🎬 Trailer Oficial
</h3>

<iframe
class="trailer-frame"
src="${concierto.trailer}"
allowfullscreen>
</iframe>

</div>

` : ""}
<h3>
Información
</h3>

<div class="info-cards">

<div class="info-card">
<div class="info-icon">🎤</div>
<div class="info-label">Tipo</div>
<div class="info-value">
${concierto.tipo}
</div>
</div>

<div class="info-card">
<div class="info-icon">🌎</div>
<div class="info-label">País</div>
<div class="info-value">
${concierto.pais}
</div>
</div>

<div class="info-card">
<div class="info-icon">📅</div>
<div class="info-label">Año</div>
<div class="info-value">
${concierto.anio}
</div>
</div>

<div class="info-card">
<div class="info-icon">⏱</div>
<div class="info-label">Duración</div>
<div class="info-value">
${concierto.duracion}
</div>
</div>

</div>

</div>

</div>
<div class="relacionados">

<h2>
También te puede gustar
</h2>

<div class="relacionados-row">

${data
.filter(x => x.id !== concierto.id)
.slice(0,4)
.map(item => `

<div
class="rel-card"
onclick="window.location.href='detalle.html?id=${item.id}'">

<img
src="${item.portada}"
alt="${item.titulo}">

<div class="rel-title">

${item.titulo}

</div>

<div class="rel-meta">

📅 ${item.anio}

</div>

<div class="rel-meta">

🌎 ${item.pais}

</div>

<div class="rel-meta">

⏱ ${item.duracion}

</div>

</div>

`).join("")}

</div>

</div>

`;
const favoritos =
JSON.parse(
localStorage.getItem("favoritos")
) || [];

const btn =
document.getElementById(
"btnFavorito"
);

if(
favoritos.includes(
Number(concierto.id)
)
){

btn.innerHTML =
"❤️ En Mi Lista";

}else{

btn.innerHTML =
"🤍 Agregar a Mi Lista";

}

});
function toggleFavorito(id){

let favoritos =
JSON.parse(
localStorage.getItem("favoritos")
) || [];

const btn =
document.getElementById(
"btnFavorito"
);

if(
favoritos.includes(
Number(id)
)
){

favoritos =
favoritos.filter(
x => x !== Number(id)
);

btn.innerHTML =
"🤍 Agregar a Mi Lista";

}else{

favoritos.push(
Number(id)
);

btn.innerHTML =
"❤️ En Mi Lista";

}

localStorage.setItem(
"favoritos",
JSON.stringify(favoritos)
);

}
function episodioAnterior(){

if(!episodioActual) return;

const indice =
listaMetaraji.findIndex(
x => x.id === episodioActual.id
);

if(indice > 0){

window.location.href =
`detalle.html?id=${listaMetaraji[indice - 1].id}`;

}

}

function episodioSiguiente(){

if(!episodioActual) return;

const indice =
listaMetaraji.findIndex(
x => x.id === episodioActual.id
);

if(indice < listaMetaraji.length - 1){

window.location.href =
`detalle.html?id=${listaMetaraji[indice + 1].id}`;

}

}