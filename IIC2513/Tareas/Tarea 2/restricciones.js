const { abrirSistemas, cerrarSistemas, restriccionesSanitarias, emiteCertificado } = require('./planificacion.js');
const readline = require('readline');


// Indica si la sintaxis del código es válida o no.
function validarSyntaxisCodigo(cadena) {
  // Se define la expresión valida con una sintaxis específica: 3 letras seguidas de 2 números.
  const regex = /^[A-Za-z]{3}[0-9]{2}$/;
  // Se utiliza la función test() de la expresión regular para evaluar si la cadena cumple
  //con el patrón definido. Si lo hace, la función devuelve true; si no, devuelve false.
  return regex.test(cadena);
}


// Devuelve una promesa que resuelve en un valor booleano o un objeto dependiendo de
//si se encuentra el código ingresado en el arreglo de restricciones.
async function pedirCodigo(restricciones) {
  // Se crea una nueva instancia de readline para leer la entrada de usuario desde la consola.
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    // Se le pide al usuario que ingrese un código y se maneja la respuesta en una función de
    //devolución de llamada asincrónica.
    rl.question('Ingrese un codigo: ', async (codigo) => {
      // Si la sintaxis del código es válida, se busca el código ingresado en el arreglo de restricciones.
      if (validarSyntaxisCodigo(codigo)) {
        const encontrado = restricciones.find((r) => r.codigo === codigo) || false;
        // Si se encuentra el código en el arreglo, se muestra un mensaje en la consola indicando
        //el destino correspondiente. Si no se encuentra, se muestra un mensaje indicando que el código no existe.
        if (encontrado) {
          console.log(`- Destino ${codigo}: ${encontrado.destino}`);
        } else {
          console.log('El codigo no existe');
        }
        // Se cierra la interfaz readline y se resuelve la promesa con el objeto encontrado.
        rl.close();
        resolve(encontrado);
      } else {
        // Si la sintaxis del código es inválida, se muestra un mensaje en la consola indicando
        //que el código es incorrecto.
        console.log('El codigo es incorrecto');
        // Se cierra la interfaz readline y se resuelve la promesa con un valor booleano false.
        rl.close();
        resolve(false);
      }
    });
  });
}

 

// La función buscarRestricciones recibe un arreglo de restricciones como argumento y utiliza otras funciones
//para buscar y mostrar restricciones asociadas al destino correspondiente al código ingresado por el usuario,
//emitir un certificado (si corresponde) y cerrar los sistemas.
async function buscarRestricciones(restricciones) {
  // Se espera a que se resuelva la promesa devuelta por la función pedirCodigo para
  //obtener el destino correspondiente al código ingresado por el usuario.
  const destino = await pedirCodigo(restricciones);
  // Si se encontró un destino para el código ingresado, se procede a abrir los sistemas,
  //buscar y mostrar restricciones sanitarias correspondientes, y emitir un certificado.
  if (destino) {
      await abrirSistemas(3300);
      const resultado = await restriccionesSanitarias(destino.restriccion, destino.destino);
      console.log(resultado.status);
      if (resultado.restriccion){
          const certificado = await emiteCertificado(destino.destino);
          console.log(certificado.status);
      }
  }
  // Finalmente, se cierran los sistemas.
  cerrarSistemas();
}


exports.buscarRestricciones = buscarRestricciones;