# Tarea 2 IIC2513
### Manuel Espinoza

## 1.  Sistema de aviso de riesgo sanitario para viajeros

El código hace uso de las siguientes funciones y de las funciones de `planificacion.js` entregadas:

- La función **validarSyntaxisCodigo()** valida si una cadena cumple con el patrón alfanumérico de 3 letras y 2 números mediante el uso de una expresión regular. La función recibe una cadena como argumento y devuelve un valor booleano que indica si la cadena cumple con el patrón o no.

- La función **pedirCodigo()** permite al usuario ingresar un código a través de la consola y lo valida mediante la función validarSyntaxisCodigo. Si el código es válido, la función busca el destino correspondiente en un arreglo de restricciones y devuelve un objeto que contiene el destino y la restricción asociada. Si el código es inválido o no se encuentra el destino correspondiente, la función devuelve false. Esta función utiliza la función readline.createInterface para leer la entrada del usuario.

- La función **buscarRestricciones()** utiliza la función pedirCodigo para obtener el destino correspondiente al código ingresado por el usuario. Si se encuentra un destino para el código ingresado, la función utiliza las funciones abrirSistemas, restriccionesSanitarias y emiteCertificado para buscar y mostrar las restricciones sanitarias correspondientes, y emitir un certificado (si corresponde). Finalmente, la función utiliza la función cerrarSistemas para cerrar los sistemas.


## 2. Métodos de encriptación caseros

El código hace uso de las funciones cifrarLetra(), cifrarTexto() y cifrarArchivo() para lograr la encriptación.

- La función **cifrarLetra()** cifra una letra individual, recibiendo como entrada la letra a cifrar y la cantidad de rotación que se desea aplicar.
- La función **cifrarTexto()** cifra todo un texto dado como entrada, utilizando la función cifrarLetra() para cada letra del texto. Devuelve el texto cifrado completo.
- La función **cifrarArchivo()** cifra un archivo de texto, leyendo el archivo, cifrando su contenido con cifrarTexto() y escribiendo el resultado en un nuevo archivo con el mismo nombre y una extensión "_cifrado.txt" añadida.
- La función **encriptacionCasera()** es la función principal del programa y utiliza la interfaz readline de Node.js para solicitar al usuario la rotación deseada, la ruta y el nombre del archivo de entrada, y llama a la función cifrarArchivo() con los parámetros adecuados.

El código también exporta la función **encriptacionCasera()** a través de exports para que pueda ser utilizada en otros archivos.


## Como correr el código:

Se abre una terminal en el directorio del proyecto y se ejecuta el comando `node index.js`. Mediante inputs y outputs se pueden ejecutar ambos desafíos. Primero se solicita el número (1 o 2) del desafío y luego los datos que requiere. En el caso del desafío número 2, es importante notar que se pide el nombre del archivo sin extensión. Es decir, si el archivo se llama `palabra.txt`, en el input se debe escribir `palabra`. En caso de que la ruta sea el mismo directorio, se indica con un `/` o `.`.

¡Listo! Si tienes alguna otra pregunta o necesitas ayuda, no dudes en preguntar. :smile: