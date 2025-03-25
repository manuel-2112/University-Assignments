#ifndef SHIP_H
#define SHIP_H

#include "order.h"

// Estructura para representar una nave
typedef struct Ship {
    int id; // Identificador de la nave
    Order* orders_head; // Puntero al primer pedido en la lista
} Ship;

#endif
