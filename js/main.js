let eventos = [];
let categoriasUnicas = [];

let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

async function getAmazingData () {
    try {
    const respuesta = await fetch(urlApi);
    const data = await respuesta.json();
    console.log (data.events);
    eventos = data.events;
    let categorias = data.events.map(event => event.category);
    let categoriasUnicas = categorias.filter((categoria, index) => categorias.indexOf(categoria) === index);
    console.log (categoriasUnicas);
    crearTarjetas(eventos);
    crearCheckbox(categoriasUnicas);
} catch (error) {
    console.log(error);
  }
  
}   
getAmazingData ();

function crearTarjetas (eventos) {
let html = "";
eventos.forEach(evento => { 
const eventoId = evento._id;   
html += `<div class="col-sm-3 py-4">
<div id=card class="card my-2 px-1 py-2 g-1">
    <img id=img src="${evento.image}" class="card-img-top" alt="${evento.name}">
    <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${evento.name}</h5>
        <p id=main class="card-text">${evento.description}</p>
        <p id=pre class="card-text">Price: ${evento.price}</p>
        <a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
    </div>
</div>
</div>`;  
document.getElementById('contenedorEventos').innerHTML = html;
});
}

function crearCheckbox(categoriasUnicas) {
    let html = '';
   categoriasUnicas.forEach(category => {
        html += `<div class= "col-sm py-4">
            <div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                    <label class="form-check-label" for="inlineCheckbox1">${category}</label>
                </div>
            </div>
        </div>`;
    });
document.getElementById('contenedorCheckbox').innerHTML = html;
}

let buscador = document.querySelector('input[name=busqueda]');
document.addEventListener('input', e => {
    if (e.target.classList.contains('form-check-input')) {
        filtradoTotal ();      
    }
});

    buscador.addEventListener('input', () => {
       filtradoTotal ();
    });

    function filtradoTotal () {
        let busqueda = buscador.value.toLowerCase();
        let filtrados = eventos.filter(evento =>
            evento.name.toLowerCase().includes(busqueda));
            let formChecks = document.querySelectorAll('.form-check-input');
            let chequeados = [];
            for (input of formChecks) {
                if (input.checked) {
                    chequeados.push(input.value);
                }
            }
            let contenedor = document.getElementById('contenedorEventos') 
               if (chequeados.length > 0){
               filtrados = filtrados.filter(evento => chequeados.includes(evento.category));
               }
               if (filtrados.length === 0) {
        contenedor.innerHTML = '<p class="mx-5 py-3"><strong>No search results</strong></p>';
    } else {
        crearTarjetas(filtrados, contenedor);
    }
}
               

               

