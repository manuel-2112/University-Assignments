//Biblioteca planificacion.js

function abrirSistemas(delay) {
  return new Promise((resolve, reject) => {
    if (delay < 3300) {
      reject(new Error('El delay debe ser mayor o igual a 3300'));
    } else {
      setTimeout(() => {
        console.log('Puede iniciar el proceso');
        resolve();
      }, delay);
    }
  });
}

function cerrarSistemas(){
   //No se modifica el código
   console.log("sistemas cerrados de forma segura");
}

function restriccionesSanitarias(restriccion, destino) {

  return new Promise((resolve, reject) => {
   setTimeout( () => {
    const randomGenerado = Math.floor(Math.random() * 91) + 10;
    if (randomGenerado < restriccion) {
      const objReturn = {};
        objReturn.restriccion = true;
        objReturn.status = "Sin restricciones sanitarias a destino: " + destino;
        resolve(objReturn);
    } else {
      const objReturn = {};
      objReturn.restriccion = false;
      objReturn.status = "Hay restricciones sanitarias a destino: " + destino;
      resolve(objReturn);
    }
   }, 3353);
 })
}

function emiteCertificado(destino) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const objReturn = {};
      objReturn.certificado = true;
      objReturn.status = "Certificado emitido para destino " + destino;
      resolve(objReturn);
    }, 3103);
  });
}


exports.abrirSistemas = abrirSistemas;
exports.cerrarSistemas = cerrarSistemas;
exports.restriccionesSanitarias = restriccionesSanitarias;
exports.emiteCertificado = emiteCertificado;