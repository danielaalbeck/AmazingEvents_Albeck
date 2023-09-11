let eventosPasados = [];
let eventosFuturos = [];
let categoriasUnicas = [];

const urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';

async function getAmazingData() {
  try {
    const respuesta = await fetch(urlApi);
    const data = await respuesta.json();
    const eventos = data.events;
    const fechaActual = data.currentDate;
    for (let evento of eventos) {
      if (evento.date < fechaActual) { eventosPasados.push(evento); }
      else { eventosFuturos.push(evento); }
    }

    console.log(data);
    console.log(eventos);
    console.log(eventosPasados);
    console.log(eventosFuturos);

    let categorias = eventos.map(evento => evento.category);
    let categoriasUnicas = categorias.filter((categoria, index) => categorias.indexOf(categoria) === index);

    crearTabla1(eventosPasados, eventos);
    crearTabla2(eventosFuturos, categoriasUnicas);
    crearTabla3 (eventosPasados,categoriasUnicas);
  } catch (error) {
    console.log(error);
  }
}

function crearTabla1(eventosPasados, eventos) {
  eventosPasados.sort((a, b) => (b.assistance / b.capacity) - (a.assistance / a.capacity));

  eventos.sort((a, b) => b.capacity - a.capacity);

  let contenedor = document.querySelector('#tabla1 tbody');
  let tbodyHtml = "";

  function obtenerNombreEvento(evento) {
    if (evento) {
      return evento.name;
    } else {
      return '';
    }
  }

  for (let i = 0; i < 3; i++) {
    const eventoMayorAsistencia = eventosPasados[i];
    const eventoMenorAsistencia = eventosPasados[eventosPasados.length - 1 - i];
    const eventoMayorCapacidad = eventos[i];

    tbodyHtml += '<tr>';
    tbodyHtml += `<td>${obtenerNombreEvento(eventoMayorAsistencia)}</td>`;
    tbodyHtml += `<td>${obtenerNombreEvento(eventoMenorAsistencia)}</td>`;
    tbodyHtml += `<td>${obtenerNombreEvento(eventoMayorCapacidad)}</td>`;
    tbodyHtml += '</tr>';
  }

  contenedor.innerHTML = tbodyHtml;
}

getAmazingData();


function crearTabla2 (eventosFuturos, categoriasUnicas) {
  let contenedor = document.querySelector('#tabla2 tbody');
  let tbodyHtml = "";

  let totalIngresos = 0;
  let totalEstimaciones = 0;

  for (let evento of eventosFuturos) {
    totalIngresos += evento.price * evento.estimate;
    totalEstimaciones += evento.estimate;
  }

  for (let categoria of categoriasUnicas) {
    const eventosCategoria = eventosFuturos.filter(evento => evento.category === categoria);

    let gananciasCategoria = 0;

    for (let evento of eventosCategoria) {
      gananciasCategoria += evento.price * evento.estimate;
    }

    const porcentajeEstimado = (gananciasCategoria / totalIngresos) * 100;
    tbodyHtml += `<tr>`;
    tbodyHtml += `<td>${categoria}</td>`;
    tbodyHtml += `<td>${gananciasCategoria}</td>`;
    tbodyHtml += `<td>${porcentajeEstimado.toFixed(2)}%</td>`;
    tbodyHtml += `</tr>`;
  }

  contenedor.innerHTML = tbodyHtml;
}

crearTabla2(eventosFuturos, categoriasUnicas)

function crearTabla3(eventosPasados, categoriasUnicas) {
  let contenedor = document.querySelector('#tabla3 tbody');
  let tbodyHtml = "";

  let totalIngresos = 0;
  let totalAsistencia = 0;

  for (let evento of eventosPasados) {
    totalIngresos += evento.price * evento.assistance;
    totalAsistencia += evento.assistance;
  }

  for (let categoria of categoriasUnicas) {
    const eventosCategoria = eventosPasados.filter(evento => evento.category === categoria);

    let gananciasCategoria = 0;

    for (let evento of eventosCategoria) {
      gananciasCategoria += evento.price * evento.assistance;
    }

    const porcentajeAsistencia = (gananciasCategoria / totalIngresos) * 100;
    tbodyHtml += `<tr>`;
    tbodyHtml += `<td>${categoria}</td>`;
    tbodyHtml += `<td>${gananciasCategoria}</td>`;
    tbodyHtml += `<td>${porcentajeAsistencia.toFixed(2)}%</td>`;
    tbodyHtml += `</tr>`;
  }

  contenedor.innerHTML = tbodyHtml;
}

crearTabla3(eventosPasados, categoriasUnicas)