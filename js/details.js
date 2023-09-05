const queryString = location.search;

const params = new URLSearchParams (queryString);

const id = params.get ("id");

const detalle = data.events.find(evento => evento._id == id );

const divDetalleEvento = document.getElementById("detalleEvento")
const estimateOrAssistance = detalle.estimate !== undefined ? detalle.estimate : detalle.assistance;
divDetalleEvento.innerHTML = `<div id="cb" class="card py-2 my-4 mx-1" style="max-width: 450px;">
<div class="row align-items-center">
    <div class=" col-md-4">
        <img id="cb2" src="${detalle.image}" class="img-fluid rounded-start mx-2" style="height: 200px; width:100%; object-fit: cover;" alt="food">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <div id="crd" class="card border-dark mx-1" style="max-width: 100%; height: 357px;">
                <h5 class="card-title d-flex justify-content-center my-1">${detalle.name}</h5>
                <p class="card-text mx-4">${detalle.description}</p>
                <p class="card-text mx-4">Category: ${detalle.category}<small class="text-body-secondary"></small></p>
                <p class="card-text mx-4">Place: ${detalle.place}<small class="text-body-secondary"></small></p>
                <p class="card-text mx-4">Capacity: ${detalle.capacity}<small class="text-body-secondary"></small></p>
                <p class="card-text mx-4">Price: ${detalle.price}<small class="text-body-secondary"></small></p>
                <p class="card-text mx-4">${detalle.estimate !== undefined ? 'Estimate' : 'Assistance'}: ${estimateOrAssistance}<small class="text-body-secondary"></small></p>
            </div>
        </div>
    </div>
</div>
</div>`;