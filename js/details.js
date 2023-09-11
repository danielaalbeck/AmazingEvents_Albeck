let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

async function getAmazingData() {
  const respuesta = await fetch(urlApi);
  const data = await respuesta.json();
  const eventos = data.events;

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id"); 

  const detalle = eventos.find(evento => evento._id == id);

  const divDetalleEvento = document.getElementById("detalleEvento");
  const estimateOrAssistance = detalle.estimate !== undefined ? detalle.estimate : detalle.assistance;
  divDetalleEvento.innerHTML = `<div id="cb" class="card py-4 my-4 mx-1" style="max-width: 600px;">
    <div class="row align-items-center">
      <div class="col-md-4">
        <img id="cb2" src="${detalle.image}" class="img-fluid rounded-start mx-4" style="height: 350px; width:100%; object-fit: cover;" alt="food">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <div id="crd" class="card border-dark mx-1" style="width: 600px; height: 357px;">
            <h5 class="card-title d-flex justify-content-center my-2">${detalle.name}</h5>
            <p class="card-text mx-4">${detalle.description}</p>
            <p class="card-text mx-4"><strong>Category:</strong> ${detalle.category}<small class="text-body-secondary"></small></p>
            <p class="card-text mx-4"><strong>Place:</strong> ${detalle.place}<small class="text-body-secondary"></small></p>
            <p class="card-text mx-4"><strong>Capacity:</strong> ${detalle.capacity}<small class="text-body-secondary"></small></p>
            <p class="card-text mx-4"><strong>Price:</strong> ${detalle.price}<small class="text-body-secondary"></small></p>
            <p class="card-text mx-4"><strong>${detalle.estimate !== undefined ? 'Estimate' : 'Assistance'}:</strong> ${estimateOrAssistance}<small class="text-body-secondary"></small></p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

getAmazingData();