/*Para agregar imagenes desde el archivo local y luego mantenerlas en la pagina debo tener una base de dato para poder accederlas cada vz que necesite
pero como no se solo dejare el crud para usarlo sin una base datos con todas las demas caracteristicas menos la de la imagen, cuando sepa como usarlo lo hare de nuevo y agregare las imagenes seguramente con una base de dato a menos que erik me solucione la inquietud*/
"use stritc";

/*Con esta funcion manejo las imagenes*/

const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

let registerCars = [];
let buttonSave = document.getElementById("save");
buttonSave.disabled = true;
let idGlobal = 0;

/*Con esta funcion previsualizamos las imagenes que carga el usuario*/
function PreviewImage() {
  let file = document.getElementById("file").files;
  if (file.length > 0) {
    let fileReader = new FileReader();

    fileReader.onload = function (event) {
      document
        .getElementById("previewimage")
        .setAttribute("src", event.target.result);
    };

    fileReader.readAsDataURL(file[0]);
  }
}

/*Varia Globals*/
const dataBody = document.getElementById("dataBody");

/*Con esta funcion obtenemos los datos que el usuario ingreso en el formulario y devolvemos un objeto con todos estos datos */
function getMydata() {
  const dataBrand = document.getElementById("brand").value;
  const dataModel = document.getElementById("model").value;
  const dataColor = document.getElementById("color").value;
  const dataYear = document.getElementById("year").value;
  const dataPrice = document.getElementById("price").value;
  const dataImg = document.getElementById("file").value;

  const data = {
    id: 0,
    brand: dataBrand,
    model: dataModel,
    color: dataColor,
    year: dataYear,
    price: dataPrice,
    img: dataImg,
  };

  return data;
}

/*Esta funcion la utilizamos para imprimir por pantalla los datos que estan almacenados en el array de registro de carros, cada vz que se activa esta funcion borra los datos que esten en pantalla y muestra solo los del array */
function printRegisterCars() {
  dataBody.innerHTML = "";

  registerCars.forEach((x) => {
    const row = `<div class="cards-content">
    <div class="data-card">
    <div class="titles">
    <span>Brand</span>
    <span>Model</span>
    <span>Color</span>
    <span>Year</span>
    <span>Price</span>
    </div>
    </div>
    <div class="datas">
    <span>${x.brand}</span>
    <span>${x.model}</span>
    <span>${x.color}</span>
    <span>${x.year}</span>
    <span>${x.price}</span>
    </div>
    <img src="${x.img}"/>
    <div>
    <button class="card-buttons" onclick="editCars(${x.id})">Edit</button>
    <button class="card-buttons" onclick="deleteCars(${x.id})">Delete</button> 
    </div>
    </div>`;

    dataBody.innerHTML += row;
    console.log(x.img);
  });
}

/*Con esta funcion Agregamos los datos que el usuario ingreso al formulario al array de registros para despues inprimirlos por pantalla */
function addCar() {
  event.preventDefault();
  const data = getMydata();
  data.id = registerCars.length + 1;
  registerCars.push(data);
  console.log(data);
  printRegisterCars();
}

/* con esta funcion que recibe el id del objeto para borrarlo del array de registros y actualiza los  indicados por pantalla*/
function deleteCars(id) {
  const search = registerCars.findIndex((x) => x.id === id);
  registerCars.splice(search, 1);
  printRegisterCars();
}

/* muestra los datos del registro en los input para poder cambiarlos y guardarlos con el boton save, el boton save esta sesabilitado, este solo se activa cuando el usuario de lio editar a un registro y se desactiva cuando el registro se guarda*/
function editCars(id) {
  idGlobal = id;
  registerCars.forEach((x) => {
    if (x.id === id) {
      document.getElementById("brand").value = x.brand;
      document.getElementById("model").value = x.model;
      document.getElementById("color").value = x.color;
      document.getElementById("year").value = x.year;
      document.getElementById("price").value = x.price;
    }
  });
  buttonSave.disabled = false;
}

function saveData() {
  const search = registerCars.find((x) => idGlobal === x.id);

  registerCars.forEach((x) => {
    if (x.id === idGlobal) {
      x.brand = document.getElementById("brand").value;
      x.model = document.getElementById("model").value;
      x.color = document.getElementById("color").value;
      x.year = document.getElementById("year").value;
      x.price = document.getElementById("price").value;
    }
  });
  printRegisterCars();

  buttonSave.disabled = true;
}

/*funciones para los 6 botones de opciones le damos a cada boton una escucha y pasamos el indice a la otra funcion para que solo nos muestre por pantalla el objeto que esta en ese indice del array, estos botones solo se podran activar cuando el array de registros 
tenga registros*/

document.getElementById("older").addEventListener("click", function () {
  if (registerCars.length > 0) {
    let index = 0;
    let data = 1000000;
    registerCars.forEach((x) => {
      if (x.year > 0 && x.year < data) {
        data = x.year;
        index = x.id;
      }
    });
    printOptionsRegisters(index);
  }
});

document.getElementById("newer").addEventListener("click", function () {
  if (registerCars.length > 0) {
    let index = 0;
    let data = 0;
    registerCars.forEach((x) => {
      if (x.year > data) {
        data = x.year;
        index = x.id;
      }
    });
    printOptionsRegisters(index);
  }
});

document.getElementById("lowercost").addEventListener("click", function () {
  if (registerCars.length > 0) {
    let index = 0;
    let data = 1000000000000000000000000;
    registerCars.forEach((x) => {
      if (x.price < data) {
        data = x.price;
        index = x.id;
      }
    });
    printOptionsRegisters(index);
  }
});

document.getElementById("highercost").addEventListener("click", function () {
  if (registerCars.length > 0) {
    let index = 0;
    let data = 0;
    registerCars.forEach((x) => {
      if (x.price > data) {
        data = x.price;
        index = x.id;
      }
    });
    printOptionsRegisters(index);
  }
});

document.getElementById("generalview").addEventListener("click", function () {
  if (registerCars.length > 0) {
    printRegisterCars();
  }
});

document.getElementById("randomdata").addEventListener("click", function () {
  console.log("datos random");
  alert("Funcion en Desarrolo xD");
});

function printOptionsRegisters(index) {
  dataBody.innerHTML = "";

  const print = registerCars.forEach((x) => {
    if (x.id === index) {
      dataBody.innerHTML += `<div class="cards-content">
      <div class="data-card">
      <div class="titles">
      <span>Brand</span>
      <span>Model</span>
      <span>Color</span>
      <span>Year</span>
      <span>Price</span>
      </div>
      </div>
      <div class="datas">
      <span>${x.brand}</span>
      <span>${x.model}</span>
      <span>${x.color}</span>
      <span>${x.year}</span>
      <span>${x.price}</span>
      </div>
      <div>
      <button class="card-buttons" onclick="editCars(${x.id})">Edit</button>
      <button class="card-buttons" onclick="deleteCars(${x.id})">Delete</button> 
      </div>
      </div>`;
    }
  });
}
