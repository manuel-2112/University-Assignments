# Instrucciones DCChess ♟️🧠

*Pueden hacer click derecho en este archivo desde VsCode y abrir la previsualización de este md*

En este problema deberás resolver un juego basado en el ajedrez. El objetivo es que la pieza del rey llegue a alguna de las casillas objetivo en la fila final del tablero. Sin embargo, en el tablero hay piezas enemigas que pueden atacar al rey, por lo que deberás entregar las reglas necesarias para que el rey pueda llegar a la fila final sin ser atacado por ninguna pieza enemiga.

Las posibles piezas atacantes son:
- `rook(X,Y,Id)`: Torre, sus posibilidades de ataque son líneas rectas horizontales y verticales.
- `bishop(X,Y,Id)`: Alfil, sus posibilidades de ataque son líneas diagonales.
- `knight(X,Y)`: Caballo, sus posibilidades de ataque son en forma de "L".
- `pawn(X,Y)`: Peón, sus posibilidades de ataque son en las diagonales delanteras (solo 1 casilla más en el eje y).

El rey se representa con la siguiente regla:
- `king(X,Y)`: Rey, se mueve en todas las direcciones, pero solo una casilla a la vez.

Las limitaciones del juego son las siguientes: 
- El rey se mueve en todas las direcciones, pero solo una casilla a la vez
- El rey no puede moverse a una casilla donde haya una pieza enemiga.
- El rey no puede moverse a una casilla donde pueda ser atacado. 
- Las piezas enemigas no se pueden mover, solo atacarán al rey si este se encuentra en su rango de ataque.

Se te entregará un mapa con las siguientes características:
- El mapa es de tamaño NxN.
- La posición (0,0) está dada en la esquina inferior izquierda y la posición (N-1,N-1) está dada en la esquina superior derecha (como un plano cartesiano).	
- En el mapa habrán casillas vacías (blancas y negras), casillas con piezas, casillas bloqueadas por los ataques (rojas) y casillas objetivo (verdes).

## Parte 1
Para resolver este problema, deberás completar el archivo `solution.lp` con las reglas necesarias para que el rey piece(king). pueda llegar a alguna casilla de la fila final sin ser atacado por ninguna pieza enemiga. Las reglas a implementar son las siguientes:
- Bloqueo de las piezas enemigas: Deberás implementar las reglas necesarias para que las piezas enemigas bloqueen las casillas que corresponden a su línea de ataque. En el archivo base `solution.lp` se encuentran las reglas para las piezas `pawn(X,Y)`. (peón) y `rook(X,Y,I)`. (torre) Deberás completar las reglas para las piezas `knight(X,Y)` (caballo) y `bishop(X,Y,I)` (alfil).

## Parte 2
Para la segunda parte del problema, deberás implementar el juego para que la pieza jugadora sea un caballo piece(knight). Deberás completar las reglas necesarias para que el caballo pueda llegar a alguna casilla de la fila final sin ser atacado por ninguna pieza enemiga. Las reglas a implementar son las siguientes:
- Acciones del caballo: Deberás implementar las acciones posibles del caballo según sus movimientos en forma de "L".
- Movimiento del caballo: Deberás implementar las reglas necesarias para que el caballo pueda moverse.
El bloqueo de las piezas enemigas es el mismo que en la parte anterior, por lo que no es necesario implementar nuevas reglas para este caso.

## Predicados
Los predicados que se te entregarán son los siguientes:
- Piezas
    - `king(X,Y,T)`: Representa la posición del rey en el tablero en el tiempo T.
    - `rook(X,Y,Id)`: Representa la posición de la torre con id=Id en el tablero.
    - `bishop(X,Y,Id)`: Representa la posición del alfil con id=Id en el tablero.
    - `knight(X,Y)`: Representa la posición de un caballo en el tablero.
    - `pawn(X,Y)`: Representa la posición de un peón en el tablero.
* Las piezas bishop y rook tienen un identificador Id que se utiliza para diferenciarlas en sus lineas de ataque, las demás piezas no lo necesitan.
- Otros
    - `kingAction()`: Las opciones de movimiento del rey.
    - `able(X,Y)`: Posición no bloqueada.
    - `exec(X,Y)`: Movimiento a ejecutar.
    - `pieceOn(X,Y,T)`: Posición ocupada por la pieza jugadora en el tiempo T. En la parte 1 es el rey, en la parte 2 es el caballo.
    - `goal(X,Y)`: Posición objetivo.
    - `done(T)`: Indica que el juego ha terminado en el tiempo T.
    - `piece()`: Indica la pieza jugadora, que puede ser king o knight.
    - `square(X,Y)`: Casilla existente en el tablero.
    - `time(T)`: Tiempos disponibles en el juego, permite darle límite de cálculo a clingo.
    - `blocked(X,Y)`: Posición bloqueada por una pieza enemiga o su ataque.
    - `rook_attack_d(X,Y,I)`, `u`,`r`,`l`: Lineas de ataque de la torre.
    - `attack_line(X,Y,I)`: Línea de ataque de la pieza I.
    - `end_attack_line(X,Y,I)`: Término de la línea de ataque de la pieza I.


## Carpetas y archivos

### Carpetas
- maps: Contiene mapas de ejemplo a resolver. Dentro de esta carpeta se encuentran 2 subcarpetas king y knight, que contienen los mapas a resolver para cada una de las partes del problema.
- visualizer: Contiene la carpeta imgs con los sprites de la visualización y el archivo `DCChess.html` que se encarga de visualizar el mapa y la solución entregada.

### Archivos
Los archivos que tendrás para resolver el problema son:
- `maps/piece/../mapX.lp`: Archivo con el mapa a resolver, donde X es el número del mapa y piece es king o knight. No los debes modificar.
- `solution.lp`: Archivo que contiene las reglas que solucionan los mapas. Acá debes completar las reglas para que resuelvan el problema. 
- `process.py`: Archivo que contiene el código que se encarga de leer la solución entregada por clingo en la consola, parsearla y generar un archivo `output.txt`. No debes modificarlo.
- `visualizer/DCChess.html`: Archivo que contiene el visualizador del mapa junto con la solución entregada. Al abrirlo en un navegador se debe ingresar al botón "Seleccionar archivo" y cargar la solución entregada en `output.txt`. No lo debes modificar.

## Comandos a utilizar
- Para comenzar a resolver el problema puede ser útil querer manipular solamente el archivo de clingo y ver la salida en la consola. Para esto se puede utilizar el siguiente comando:
`clingo maps/king/../mapX.lp solution.lp` o `clingo maps/knight/../mapX.lp solution.lp`, donde `..` debe ser reemplazado según la subcarpeta dentro de king o knight.
Con esto, se podrá ver la salida de clingo en la consola y verificar si las reglas están funcionando correctamente. En esta parte, puedes modificar los statements #show para que te sea más fácil depurar el código.

- Una vez que tengas una solución que te parezca correcta, puedes ejecutar el siguiente comando para generar el archivo `output.txt`: `clingo maps/piece/../mapX.lp solution.lp | python process.py`. Este comando ejecutará clingo y luego procesará la salida para generar el archivo `output.txt`. Es muy importante que, en esta parte, mantengas los statements #show que se entregaron inicialmente en el archivo `solution.lp` para que el proceso de parseo funcione correctamente. Si el comando `python` no funciona, puedes intentar con `python3` o `py`.

- Statements visualizer
```
    - #show square/2.
    - #show time/1.
    - #show done/1.
    - #show goal/2.
    - #show bishop/3.
    - #show knight/2.
    - #show pawn/2.
    - #show rook/3.
    - #show pieceOn/3.
    - #show piece/1.
    - #show blocked/2.
```

- Finalmente, puedes abrir el archivo `DCChess.html` en un navegador y cargar el archivo `output.txt` que se generó en el paso anterior. De esta forma, podrás visualizar el mapa y la solución entregada por clingo.

## Entrega
- Deberás entregar el archivo `solution.lp` con las reglas implementadas para resolver el problema.
- El archivo `solution.lp` debe estar correctamente comentado para que se entienda la lógica de las reglas implementadas.
