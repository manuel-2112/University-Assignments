//Este código contiene funciones para cifrar una letra, un texto y un archivo usando una rotación determinada

//Se importan los módulos necesarios
const fs = require('fs');
const readline = require('readline');

function cifrarLetra(letra, rotacion) {
    // Definimos el alfabeto, incluyendo letras con tildes y diéresis
    const alfabeto = 'abcdefghijklmnopqrstuvwxyzáéíóúü';
    // Convertimos la letra a minúscula para asegurarnos de que esté en el alfabeto
    const letraMinuscula = letra.toLowerCase();
    // Obtenemos el índice de la letra en el alfabeto (o -1 si no está)
    const indice = alfabeto.indexOf(letraMinuscula);
    // Si la letra no está en el alfabeto, la devolvemos tal cual
    if (indice === -1) {
      return letra;
    }
    // Calculamos el nuevo índice rotando el alfabeto según la cantidad dada
    const nuevoIndice = (indice + rotacion) % alfabeto.length;
    // Obtenemos la nueva letra según el nuevo índice
    const nuevaLetra = alfabeto[nuevoIndice];
    // Devolvemos la nueva letra en mayúscula o minúscula según corresponda
    return (letra === letraMinuscula) ? nuevaLetra : nuevaLetra.toUpperCase();
  }
  

function cifrarTexto(texto, rotacion) {
    // Inicializamos una variable para guardar el resultado cifrado
    let resultado = '';

    // Convertimos el texto en un array de letras y lo recorremos con forEach
    texto.split('').forEach(letra => {
        // Por cada letra, llamamos a la función cifrarLetra para obtener la letra cifrada
        const letraCifrada = cifrarLetra(letra, rotacion);
        // Agregamos la letra cifrada al resultado
        resultado += letraCifrada;
    });

    // Devolvemos el resultado cifrado
    return resultado;
}
  

function cifrarArchivo(rutaArchivo, rotacion) {
    // Leemos el archivo especificado
    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        // Si hay un error, mostramos un mensaje y salimos de la función
        if (err) {
        console.log('Hubo un error al leer el archivo...')
        return;
        }

        // Ciframos el texto del archivo usando la función cifrarTexto
        const textoCifrado = cifrarTexto(data, rotacion);
        // Creamos una nueva ruta de archivo para guardar el resultado cifrado
        const ultimoPunto = rutaArchivo.lastIndexOf('.');
        const nuevaRutaArchivo = rutaArchivo.slice(0, ultimoPunto) + '_cifrado' + rutaArchivo.slice(ultimoPunto);

        // Guardamos el resultado cifrado en el nuevo archivo
        fs.writeFile(nuevaRutaArchivo, textoCifrado, 'utf8', (err) => {
        // Si hay un error, mostramos un mensaje y salimos de la función
        if (err) {
            console.log('Hubo un error al guardar el archivo...')
            return;
        }
        // Si todo sale bien, mostramos un mensaje indicando dónde se guardó el archivo cifrado
        console.log(`Archivo cifrado guardado en ${nuevaRutaArchivo}`);
        });
    });
}
  
function encriptacionCasera(){
    // Creamos una interfaz de lectura de línea para poder pedir al usuario que ingrese la rotación y la ruta del archivo
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Pedimos al usuario que ingrese la rotación y manejamos el caso en que no ingrese un número entero y positivo
    rl.question('Ingresa la rotación: ', (rotacion) => {
        if (!Number.isInteger(parseInt(rotacion)) || rotacion < 0) {
            console.log('La rotación debe ser un número entero y positivo');
            rl.close();
        }
        else {
            // Si el usuario ingresa una rotación válida, pedimos la ruta y el nombre del archivo
            rl.question('Introduce la ruta relativa a donde esta el archivo: ', (ruta) => {
                if (ruta === '/') {
                    ruta = '.';
                }
                rl.question('Introduce el nombre del archivo (sin extension): ', (nombre) => {
                    // Combinamos la ruta y el nombre para obtener la ruta completa del archivo
                    const rutaArchivo = ruta + '/' + nombre + '.txt'
                    console.log(rutaArchivo);
                    // Ciframos el archivo usando la función cifrarArchivo
                    cifrarArchivo(rutaArchivo, parseInt(rotacion))
                    // Cerramos la interfaz de lectura de línea
                    rl.close();
                });
            });
        }
    });
}

//Exportamos la función encriptacionCasera() para que pueda ser utilizada
//en otros archivos
exports.encriptacionCasera = encriptacionCasera;