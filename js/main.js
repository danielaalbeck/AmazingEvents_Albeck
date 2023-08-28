const eventos = data.events;
console.log(eventos)

const fechaActual = data.currentDate;
console.log(fechaActual)

const events = data.events;
for (let i = 0; i < eventos.length; i++) { console.log(eventos[i]); }

let contenedorEventos = document.getElementById('contenedorEventos');

for (let eventos of events) {
    let card = `<div class="col-sm-3 py-4">
                    <div id="card1" class="card mx-2 my-2 px-1 py-2 g-1">
                        <img id="img1" src="${eventos.image}" class="card-img-top" alt="${eventos.name}">
                        <div class="card-body d-flex flex-column justify-content-between ">
                            <h5 class="card-title">${eventos.name}</h5>
                            <p class="card-text">${eventos.description}<br>Price: ${eventos.price}</p>
                            <a href="./details.html" class="btn btn-primary" id="bn1">Details</a>
                        </div>
                    </div>`;
    contenedorEventos.innerHTML += card;
}
