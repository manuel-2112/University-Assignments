#ifndef HEAP_UTILITIES_H
#define HEAP_UTILITIES_H

#include "order_struct.h"

void pushCompra(Orden heap[], Orden orden, int *size);
void pushVenta(Orden heap[], Orden orden, int *size);
Orden popCompra(Orden heap[], int *size);
Orden popVenta(Orden heap[], int *size);

#endif
