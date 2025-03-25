# Tarea 0: DCCorreos de Chile :mailbox:

## Consideraciones generales :octocat:

DCCorreos es un programa con un flujo de Menus que despliegan opciones para el usuario sobre encomiendas y reclamos. Los datos se almacenan en archivos csv y son manejados por el programa. Por ultimo el programa ocupa parametros generales que se pueden modificar en ```parametros.py```.

### Cosas implementadas y no implementadas :white_check_mark: :x:

* Esta todo lo del enunciado implementado :white_check_mark:

## Ejecución :computer:
El módulo principal de la tarea a ejecutar es  ```main.py```. Además se debe crear los siguientes archivos y directorios adicionales:
1. ```reclamos.csv``` en el mismo directorio que los demás archivos (```T0```)
2. ```usuarios.csv``` en el mismo directorio que los demás archivos (```T0```)
3. ```usuarios.csv``` en el mismo directorio que los demás archivos (```T0```) 


## Librerías :books:
### Librerías externas utilizadas
La lista de librerías externas que utilicé fue la siguiente:

1. ```datetime```: ```datetime.now()``` y ```strftime()``` en ```main.py```
2. ```tabulate```: ```tabulate()``` en ```entidades.py``` y en ```menu.py``` **(debe instalarse)**
3. ```os```: ```path``` y ```join``` en ```parametros.py```

Para instalar ```tabulate``` se tiene que escribir en la ```cmd```: ```pip install tabulate``` para cualquier duda acá hay más información: https://blog.finxter.com/how-to-install-tabulate-in-python/


### Librerías propias
Por otro lado, los módulos que fueron creados fueron los siguientes:

1. ```main```: Se encarga del flujo general del programa mediante los Menus y los Datos.
2. ```menus```: Contiene a todas las clases de Menus, los cuales tienen opciones que despliegan y captan la desicion tomada por la persona y ejecutan una accion, enviando los datos a ```main```.
3. ```entidades```: Contiene a las clases ```Encomiendas```, ```Usuario```, ```Reclamo``` y ```Admin```
4. ```cargar_datos```: Se encarga de manejar los archivos csv y almacenar los datos, en un principio los lee, luego se encarga de verificar si existen o calzan datos ingresados y tambien de modificar los archivos csv si es necesario.

## Supuestos y consideraciones adicionales :thinking:
Los supuestos que realicé durante la tarea son los siguientes:

1. Los pesos ingresados tienen su parte decimal tras un punto, no una coma.
-------

## Referencias de código externo :book:

Para realizar mi tarea saqué código de:
1. https://www.geeksforgeeks.org/python-check-for-float-string/: este lo ocupe para verificar si el numero ingresado en el peso de una encomienda es valido. Está implementado en el archivo ```entidades.py``` en la clase ```Encomiendas```, en el metodo ```validar_peso(self, peso)```.

2. https://www.askpython.com/python-modules/tabulate-tables-in-python: este lo ocupe para aprender a usar la libreria ```tabulate``` que me sirvio para hacer tablas mas ordenadas. Esta implementado ```entidades.py``` y en ```menu.py``` en la clase ```Usuario``` en el metodo ```visualizar_encomiendas_realizadas(self)``` y en el ```MenuEncomiendas``` en su metodo ```desplegar_menu(self)```.

3. https://www.programiz.com/python-programming/datetime/current-datetime : este para aprender a ocupar la libreria ```datetime```, en ```main.py``` para obtener la fecha y hora del momento y pasarlo a string.