# Tarea 1: DCCasino :spades::hearts::clubs::diamonds:

## Consideraciones generales :octocat:

DCCasino es un programa que mediante Menus impresos en una terminal realiza simulaciones de un casino donde se puede jugar diferentes juegos, comprar bebestibles e ir a shows. Los datos sobre los jugadores, bebestibles y juegos disponibles estan en archivos CSV. Todos los parametros generales que se quieran modificar se encuentran en ```parametros.py```.

### Cosas implementadas y no implementadas :white_check_mark: :x:

* Esta todo lo del enunciado implementado :white_check_mark:

## Ejecución :computer:
El módulo principal de la tarea a ejecutar es  ```main.py```. Además se debe crear los siguientes archivos y directorios adicionales:
1. La carpeta ```datos``` en el mismo directorio que los demás archivos (```T1```) con:
    - ```jugadores.csv```: archivo que contiene informacion de los jugadores disponibles
    - ```bebestibles.csv```: archivo que contiene informacion de los bebestibles disponibles
    - ```juegos.csv```: archivo que contiene informacion de los juegos disponibles


## Librerías :books:
### Librerías externas utilizadas
La lista de librerías externas que utilicé fue la siguiente:

1. ```abc```: ```ABC``` y ```abstractmethod``` en ```menus.py```, ```bebestibles.py``` y ```jugadores.py``
2. ```random```: ```random()```, ```randint()``` y ```choice()``` en ```entidades.py``` y ```bebestibles.py```
3. ```tabulate```: ```tabulate()``` en ```entidades.py```,```menus.py```, ```bebestibles.py``` y ```jugadores.py``` **(debe instalarse)**
4. ```os```: ```path``` y ```join``` en ```parametros.py```

Para instalar ```tabulate``` se tiene que escribir en la ```cmd```: ```pip install tabulate``` para cualquier duda acá hay más información: https://blog.finxter.com/how-to-install-tabulate-in-python/

### Librerías propias
Por otro lado, los módulos que fueron creados fueron los siguientes:

1. ```main.py```: Se encarga de iniciar con la simulacion del programa
2. ```simulacion.py```: Se encarga del flujo general del Casino mediante los Menus y los Datos.
3. ```menus.py```: Contiene la clase abstracta Menu y todos los Menus que heredan de ella, los cuales tienen metodos que despliegan y captan la desicion tomada por la persona enviando los datos a ```simulacion```.
4. ```cargar_datos.py```: Se encarga de manejar los archivos csv, en un principio los lee y convierte los datos a su respectiva entidad, luego los almacena y son importados por ```simulacion```.
5. ```entidades.py```: Contiene a las clases ```Casino```, ```Juegos```, ```Show```.
6. ```jugadores.py```: Contiene a la clase abstracta ```Jugador``` y a las clases que heredan de ella ```Bebedor```, ```Tacano```, ```Casual``` y ```Ludopata```.
7. ```bebestibles.py```: Contiene a la clase abstracta ```Bebestible``` y a las clases que heredan de ella ```Jugo``` y ```Gaseosa```. Tambien tiene la clase ```BrebajeMagico``` que hereda de ```Jugo``` y ```Gaseosa```.

## Supuestos y consideraciones adicionales :thinking:
Los supuestos que realicé durante la tarea son los siguientes:

1. Se puede salir del programa con una ```X``` o una ```x```.
-------

## Referencias de código externo :book:

Para realizar mi tarea saqué código de:
1. https://stackoverflow.com/questions/27411252/how-to-check-if-input-is-text : para saber si un input era texto, de aca saque el metodo ```isalpha()```
2. https://bitbucket.org/astanin/python-tabulate/src/master/ : este lo ocupe para usar la libreria ```tabulate```

Muchas gracias por leer hasta aca! Espero te guste el programa.