#ifndef ORDER_H
#define ORDER_H

#include <stdbool.h>

// Estructura para representar un pedido
typedef struct Order {
    int id; // Identificador del pedido
    int planet_id; // Identificador del planeta destino
    struct Order* next; // Puntero al siguiente pedido en la lista
} Order;

#endif
