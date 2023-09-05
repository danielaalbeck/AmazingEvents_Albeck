const fechaActual = data.currentDate;
const eventos = data.events;

const eventosFuturos = [];

for (let evento of eventos) { if (evento.date > fechaActual)
{ eventosFuturos.push (evento); }}
console.log (eventosFuturos)

let categorias = data.events.map(event => event.category);
let categoriasUnicas = categorias.filter((categoria, index) => categorias.indexOf(categoria) === index);
console.log(categoriasUnicas);

let contenedor = document.getElementById('contenedorFuturo');
let contenedorch = document.getElementById('contenedorCheckboxup');
let buscador = document.querySelector('input[name=busqueda]');

function mostrarTarjetas(array, contenedor) {
    let html = '';
    array.forEach(evento => {
        const eventoId = evento._id;
        html += `<div class="col-sm-3 py-4">
            <div id=card class="card mx-3 my-2 px-1 py-2 g-1">
                <img id=img src="${evento.image}" class="card-img-top" alt="${evento.name}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text">${evento.description}<br>Price: ${evento.price}</p>
                    <a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>`;
    });
    contenedor.innerHTML = html;
}
mostrarTarjetas(eventosFuturos, contenedor);


function mostrarCheckbox(array, contenedor) {
    let html = '';
    array.forEach(category => {
        html += `<div class= "col-sm py-4">
            <div class="d-flex">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                    <label class="form-check-label" for="inlineCheckbox1">${category}</label>
                </div>
            </div>
        </div>`;
    });
    contenedor.innerHTML = html;
}

mostrarCheckbox(categoriasUnicas, contenedorch);


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
        let filtrados = eventosFuturos.filter(evento =>
            evento.name.toLowerCase().includes(busqueda));
            let formChecks = document.querySelectorAll('.form-check-input');
            let chequeados = [];
            for (input of formChecks) {
                if (input.checked) {
                    chequeados.push(input.value);
                }
            }
               if (chequeados.length > 0){
               filtrados = filtrados.filter(evento => chequeados.includes(evento.category));
               }
               if (filtrados.length === 0) {
        contenedor.innerHTML = '<p class="mx-5 py-3"><strong>No se encontraron resultados que coincidan con la búsqueda</strong></p>';
    } else {
        mostrarTarjetas(filtrados, contenedor);
    }
}
               

   
