#ifndef MARKET_OPERATIONS_H
#define MARKET_OPERATIONS_H

#include "order_struct.h"
#include <stdio.h>

void processBuy(Orden *compras, Orden *ventas, int *comprasSize, int *ventasSize, Orden nuevaCompra, FILE *output);
void processSell(Orden *compras, Orden *ventas, int *comprasSize, int *ventasSize, Orden nuevaVenta, FILE *output);
void processStatus(Orden *compras, Orden *ventas, int *comprasSize, int *ventasSize, FILE *output);

#endif
