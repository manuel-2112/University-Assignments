# Tarea 3: DCComando Espacial :rocket::alien:

## Consideraciones generales :octocat:

DCComando Espacial es un juego que consiste en ayudar a Terminator-Dog a eliminar los diversos aliens, dependiendo del ambiente seleccionado.
Creo que implemente todo lo que mencionaba el enunciado y no deberia haber problemas al ejecutar el juego, ni tampoco con jugar varias partidas en una misma ejecucion. Espero no tengas problemas viendo el codigo, en lo que sigue se especifica todo lo demás.

### Cosas implementadas y no implementadas :white_check_mark: :x:

* Ventana de Inicio: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
* Ventana de Ranking: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
* Ventana principal: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
* Ventana de juego: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
* Ventana de post-nivel: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
* Mecánicas de juego: 
    * Arma: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
    * Aliens y Escenario de Juego: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
    * Fin de Nivel: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
    * Fin del juego: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
* Cheatcodes: Esta todo lo de la distribución de puntaje implementado :white_check_mark:
* Bonus:
    * Risa Dog: :white_check_mark:
    * Bomba: :white_check_mark:
    * Estrella: :x:
    * Disparos Extras: :x:

## Ejecución y librerías propias :computer:
El módulo principal de la tarea a ejecutar es  ```main.py```. Además deben estar los siguientes archivos y directorios adicionales:
1. La carpeta ```backend``` en el mismo directorio que los demás archivos (```T2```) con:
    - Módulos que fueron creados:
        - ```logica_juego.py```: archivo que maneja los datos del juego
        - ```logica_principal.py```: archivo que maneja los datos del entrada al juego
        - ```logica_ranking.py```: archivo que maneja los datos del ranking de mejores puntajes
        - ```entidades.py```: archivo que maneja y contiene elementos del juego
        - ```bonus.py```: archivo que contiene a la clase BombaHielo, parte del bonus Bomba.
2. La carpeta ```frontend``` en el mismo directorio que los demás archivos (```T2```) con:
    - Carpetas:
        - ```UI files```: carpeta que contiene las ventanas del juego en formato "ui" que fueron creadas
        - ```Sprites```: carpeta que contiene las imagenes que se utilizan en el juego en formato "png" que fueron entregadas
        - ```Sonidos```: carpeta que contiene archivos de audio que se utilizan en el juego en formato "wav" que fueron entregados
    - Módulos que fueron creados:
        - ```ventana_inicio.py```: Instancia VentanaInicio.ui
        - ```ventana_juego.py```: Instancia VentanaJuego.ui
        - ```ventana_principal.py```: Instancia VentanaPrincipal.ui
        - ```ventana_postnivel.py```: Instancia VentanaResumen.ui
        - ```ventana_ranking.py```: Instancia VentanaRankings.ui
3. El archivo ```parametros.py``` que contiene datos de parametro para el funcionamiento del juego
4. **Opcional**: El archivo ```puntajes.txt``` que va a guardar los puntajes de los jugadores (es opcional iniciar con este, pero de igual forma el programa lo va a crear al jugar por primera vez).

## Librerías :books:
### Librerías externas utilizadas
La lista de librerías externas que utilicé fue la siguiente:

1. ```PyQt5```: Ocupé esta librería que crea las interfaces gráficas en casi todas los módulos de la tarea. **(debe instalarse)**
    - ```QtCore.QObject```
    - ```QtCore.QTimer```
    - ```QtCore.Qmutex```
    - ```QtCore.pyqtSignal```
    - ```QtMultimedia```
    - ```QMessageBox```
    - ```uic.loadUiType```
    - ```QtGui.QPixmap```
2. ```os```: ```path``` y ```join```
3. ```random```: ```random()```, ```randint()```, ```getrandbits()``` y ```uniform```
4. ```collections```: ```MutableMapping``` y ```Counter```


## Supuestos y consideraciones adicionales :thinking:
Los supuestos que realicé durante la tarea son los siguientes:

1. El disparador dispara por el centro, donde se ubica la mira que cambia de color, y al chocar con el límite de la ventana, es la mira la que no sale de esta, el resto del disparador si puede salir de la pantalla.
2. Los movimientos del disparados se efectuan con las siguientes teclas:
    - ```W```: arriba
    - ```S```: abajo
    - ```A```: izquierda
    - ```D```: derecha
    - **```K```: disparo**
    - **Se puede mover en diagonal**: Por ejemplo al apretar  ```W + D``` el disparador se mueve en diagonal a hacia la derecha y arriba.
3. Los cheatcodes funcionan al presionar las teclas al mismo tiempo.
4. El cheatcode de balas infinitas, te otorga la habilidad de gastar infinitas balas, pero al momento de calcular puntaje, ```balas_restantes``` va a ser la cantidad de balas que el jugador tenia al momento de ocupar el cheatcode. Decidi esto ya que sino se desvirtuaban demasiado los puntajes obtenidos.
5. El ranking ordena los 5 mayores puntajes independientes que sean de un mismo jugador o no.
6. La bomba de hielo tiene 50% de posibilidad de aparecer en un nivel, independiente del nivel.
7. Los aliens nunca aparecen sobrepuestos, pero al moverse si se pueden sobreponer

## Referencias de código externo :book:

Para realizar mi tarea saqué código de:
1. https://stackoverflow.com/questions/7760916/correct-usage-of-a-getter-setter-for-dictionary-values : Esto me ayudo cuando defini la clase AliensPantalla en ```entidades.py```
2. https://doc.qt.io/qtforpython-5/PySide2/QtCore/QMutex.html : Aunque esto es la documentacion de pyqt5, ocupe el elemento QMutex para no modificar el valor de un diccionario al mismo tiempo. Esta en```logica_juego.py``` en el metodo ```instanciar_timers_generales``` se instancia, y en ```secuencia_explosion``` se realiza el lock y el unlock.
3. https://stackoverflow.com/questions/9249500/pyside-pyqt-detect-if-user-trying-to-close-window : Este evento lo ocupe en ```ventana_ranking.py``` para volver a inicio al cerrar la ventana, como dice el enunciado.
4. https://stackoverflow.com/questions/7176951/how-to-get-multiple-key-presses-in-single-event : Este truco lo ocupe en ```ventana_juego.py``` para poder captar más de una tecla a la vez, para realizar movimientos en diagonales y para que los cheatcodes funcionen presionando al mismo tiempo.
5. https://stackoverflow.com/questions/6824681/get-a-random-boolean-in-python : Este truco lo ocupe para obtener un booleano de manera aleatoria y se aplica en la aparicion de la bomba de hielo.
6. https://stackoverflow.com/questions/8866652/determine-if-2-lists-have-the-same-elements-regardless-of-order : Esto lo ocupe para verificar que las teclas apretadas de los cheatcodes fueran las indicadas, independiente de si para el computador uno apretara una antes que otra.

Eso es todo! Espero que te funcione bien!! :alien::dog2: