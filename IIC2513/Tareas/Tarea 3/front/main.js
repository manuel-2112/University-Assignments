let operacion = "";
let num1 = "";

function actualizarResultado(nuevoResultado) {
  var resultadoActual = document.getElementById("resultado")
  resultadoActual.textContent = nuevoResultado;
}
function concatenarNumero(numero) {
  var resultadoActual = document.getElementById("resultado").textContent;
  if (resultadoActual === "0" || resultadoActual === "Error" || 
    resultadoActual === "+" || resultadoActual === "-" ||
    resultadoActual === "x" || resultadoActual === "÷" ) {
    resultadoActual = numero;
  } else {
    resultadoActual += numero;
  }
  actualizarResultado(resultadoActual);
}

function reiniciarResultado(){
  actualizarResultado("0")
}

function borrarNumero() {
  var resultadoActual = document.getElementById("resultado").textContent;

  if (resultadoActual !== "0" && resultadoActual !== "Error" && 
      resultadoActual !== "+" && resultadoActual !== "-" &&
      resultadoActual !== "x" && resultadoActual !== "÷") {
    resultadoActual = resultadoActual.slice(0, -1);
    if (resultadoActual !== ""){
      actualizarResultado(resultadoActual);
    } else {
      reiniciarResultado()
    }
    
  }
}

function apiGet(operacion, num1, num2){
  fetch(`http://localhost:80/${operacion}/${num1}/${num2}`)
  .then(response => {
    return response.json()
      .then(data => {
        if (response.ok) {
          return data;
        } else {
          throw new Error(`[${data.status}] ${data.result}` || 'Error en la solicitud');
        }
      });
  })
  .then(data => {
    actualizarResultado(data.result);
  })
  .catch(error => {
    alert(`Error:  ${error.message}`);
    actualizarResultado(`Error`);
  });
}

function apiPost(operacion, num1, num2) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ num1: num1, num2: num2 })
  };

  console.log(requestOptions);

  fetch(`http://localhost:80/${operacion}`, requestOptions)
    .then(response => {
      return response.json()
        .then(data => {
          if (response.ok) {
            return data;
          } else {
            throw new Error(`[${data.status}] ${data.result}` || 'Error en la solicitud');
          }
        });
    })
    .then(data => {
      actualizarResultado(data.result);
    })
    .catch(error => {
      console.error(`Error: ${error.message}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  var botonesNumericos = document.querySelectorAll('[id^="num-"]');
  var botonAC = document.getElementById("AC");
  var botonDelete = document.getElementById("delete");
  var sumaButton = document.getElementById('suma');
  var restaButton = document.getElementById('resta');
  var multiplicacionButton = document.getElementById('multiplicacion');
  var divisionButton = document.getElementById('division');
  var enterButton = document.getElementById('enter');


  botonesNumericos.forEach(function(boton) {
    var numero = boton.id.split('-')[1];
    boton.addEventListener('click', function() {
      concatenarNumero(numero);
    });
  });

  botonAC.addEventListener('click', function() {
    reiniciarResultado();
  });

  botonDelete.addEventListener('click', function() {
    borrarNumero();
  });

  sumaButton.addEventListener('click', () => {
    num1 = parseInt(document.getElementById("resultado").textContent);
    operacion = "suma";
    actualizarResultado("+");
  });

  restaButton.addEventListener('click', () => {
    num1 = parseInt(document.getElementById("resultado").textContent);
    operacion = "resta";
    actualizarResultado("-");
  });

  multiplicacionButton.addEventListener('click', () => {
    num1 = parseInt(document.getElementById("resultado").textContent);
    operacion = "multiplicacion";
    actualizarResultado("x");
  });

  divisionButton.addEventListener('click', () => {
    num1 = parseInt(document.getElementById("resultado").textContent);
    operacion = "division";
    actualizarResultado("÷");
  });
  
  enterButton.addEventListener('click', () => {
    const num2 = parseInt(document.getElementById("resultado").textContent);
    if (operacion === "suma" || operacion === "multiplicacion"){
      apiGet(operacion, num1, num2);
    } else if (operacion === "resta" || operacion === "division") {
      apiPost(operacion, num1, num2);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      enterButton.click();
    } else if (/[0-9]/.test(event.key)) {
      concatenarNumero(event.key);
    }
  });
});