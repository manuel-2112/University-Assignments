# Tarea 3: DCCasillas :dart:

## Consideraciones generales :octocat:

DCCasillas es un juego no terminado que cuenta con arquitectura de cliente-servidor y una encriptacion de los mensajes intercambiados. Funciona bien el intercambio de mensajes entre estos y la instanciacion de la Ventana de Inicio. Al ingresar un nombre de usuario sale un error de importacion que no supe resolver, pero si verifica el nombre ingresado y lo guarda en la Logica del programa.

### Cosas implementadas y no implementadas :white_check_mark: :x: :heavy_minus_sign:

Ocupe esta clasificacion para que sea mas facil revisar:
:white_check_mark: : Implementado (Hasta donde se llego en la tarea)
:x: : No implementado
:heavy_minus_sign: : No implementado en su totalidad

* Networking:
    * Protocolo: :white_check_mark:
    * Sockets: :white_check_mark:
    * Conexion: :heavy_minus_sign:
    * Manejo de clientes: :white_check_mark:
* Arquitectura Cliente - Servidor:
    * Roles: :white_check_mark:
    * Consistencia: :x:
    * Logs: :white_check_mark:
* Manejo de Bytes:
    * Codificacion: :white_check_mark:
    * Decodificacion: :white_check_mark:
    * Encriptacion: :white_check_mark:
    * Desencriptacion: :white_check_mark:
    * Integracion: :white_check_mark:
* Interfaz:
    * Ventana de Inicio: :white_check_mark:
    * Sala de espera: :x:
    * Sala de Juego: :x:
    * Ventana final: :x:
* Reglas DCCasillas: :x:
*General:
    * Parametros JSON: :white_check_mark:
*Bonus: :x:


## Ejecución y librerías propias :computer:
La tarea cuenta con dos módulos que se pueden ejecutar:
*  ```main.py``` en  ```servidor```
*  ```main.py``` en  ```cliente```

Además deben estar los siguientes archivos y directorios adicionales:

Dentro de ```servidor```:
1. ```entidades.py```: Tiene las clases Mensaje (con su encriptacion y desencriptacion) y Jugador.
2. ```get_info```: Libreria propia que escribe el archivo ```parametros.json``` al iniciar servidor.
3. ```logica```: Funciones de logica del servidor con respecto a comandos y otros.
4. ```servidor.py```: Contiene a la clase Servidor para la arquitectura.


Dentro de ```cliente```:
1. La carpeta ```backend```:
    - Módulos que fueron creados:
        - ```cliente.py```: Contiene a la clase Cliente para la arquitectura.
        - ```interfaz.py```: Contiene la logica de las ventanas del cliente y los mensajes con el servidor.
        - ```entidades.py```: Contiene la clase Mensaje con su encriptacion y desencriptacion.
2. La carpeta ```frontend``` en el mismo directorio que los demás archivos (```T2```) con:
    - Carpetas:
        - ```UI files```: carpeta que contiene las ventanas del juego en formato "ui" que fueron creadas. (Algunas no fueron implementadas)
        - ```Sprites```: carpeta que contiene las imagenes que se utilizan en el juego en formato "png" que fueron entregadas.
    - Módulos que fueron creados:
        - ```ventana_inicio.py```: Instancia VentanaInicio.ui
        - ```ventana_espera.py```: Instancia VentanaEspera.ui
        - ```ventana_juego.py```: Instancia VentanaJuego.ui

3. El archivo ```parametros.json``` que contiene datos de parametro para el funcionamiento del programa se crea solo al correr ```main.py``` en sus carpetas respectivas.

## Librerías :books:
### Librerías externas utilizadas
La lista de librerías externas que utilicé fue la siguiente:

1. ```PyQt5```: Ocupé esta librería que crea las interfaces gráficas. **(debe instalarse)**
    - ```QtCore.QObject```
    - ```QtCore.pyqtSignal```
    - ```QMessageBox```
    - ```uic.loadUiType```
    - ```QtGui.QPixmap```
2. ```os.path``` (```join```)
3. ```socket```
4. ```threading```
5. ```json```
6. ```pickle```


## Referencias de código externo :book:

Para realizar mi tarea saqué código de:
1. https://stackoverflow.com/questions/33678421/python-tabulate-appending-element-to-current-table : Para crear el log en el servidor.

Eso es todo! Espero que te funcione bien hasta donde se llego!!