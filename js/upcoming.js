const fechaActual = data.currentDate;
const eventos = data.events;

const eventosFuturos = [];

for (let evento of eventos) { if (evento.date > fechaActual)
{ eventosFuturos.push (evento); }}
console.log (eventosFuturos)

let contenedorFuturo = document.getElementById('contenedorFuturo');

for (let eventos of eventosFuturos) {
    let card = `<div class="col-sm-3 py-4">
    <div id="card1" class="card mx-2 my-3 px-1 py-2">
        <img id="img1" src="${eventos.image}" class="card-img-top" alt="${eventos.name}">
        <div class="card-body d-flex flex-column justify-content-between ">
            <h5 class="card-title">${eventos.name}</h5>
            <p class="card-text">${eventos.description}<br>Price: ${eventos.price}</p>
            <a href="./details.html" class="btn btn-primary">Details</a>
        </div>
    </div>`; ;
    contenedorFuturo.innerHTML += card;
}
