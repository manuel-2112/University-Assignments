# Entrega 3: Proyecto final grupos 31/32 :white_check_mark:

## Funcionamiento:
El funcionamiento se basa en un archivo índex.php el cual contiene la lógica de la aplicación, desde ahí se llaman a los archivos de la carpeta consultas.

## Importar Usuarios:

Esta función se realiza desde el archivo importar_usuarios.php en la carpeta consultas, donde se implementan las funciones en sql de la carpeta procedures. Esta función realiza una tabla usuarios con todos los artistas y productoras. En el caso de que la tabla ya exista se elimina y se crea de nuevo. Esta tabla se crea en el servidor del grupo 31 y utiliza las productoras del servidor del grupo 32 y los artistas del servidor del grupo 31. Las contraseñas de cada usuario son números aleatorios entre 100000 y 999999. 

Es importante mencionar que cada vez que se importan los usuarios, las contraseñas se generan nuevamente.

## Navegación Productora:

Una vez que ingresa una productora, se ingresa a un dashboard donde uno tiene la posibilidad de hacer tres consultas, la primera muestra todos los eventos de esta productora, la segunda permite filtrar los eventos por fecha y la tercera permite crear eventos. Cabe destacar que cada vez que se crean eventos la productora puede observarlos en la consulta que permite ver los eventos. Lamentablemente estos eventos no se pueden observar cuando uno inicia sesión como artista, dado que por temas de tiempo no pudimos actualizar la segunda bases de datos.

## Navegación Artista:

Una vez que ingresa un artista, se ingresa a un dashboard donde uno puede observar los eventos de este. Además uno puede revisar los detalles de cada evento.


Esperamos que te guste y te sea fácil corregirlo. :rocket: :smile: