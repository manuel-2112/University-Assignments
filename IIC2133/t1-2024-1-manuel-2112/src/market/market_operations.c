#include "market_operations.h"
#include "heap_utilities.h"
#include <stdio.h>

void processBuy(Orden *compras, Orden *ventas, int *comprasSize, int *ventasSize, Orden nuevaCompra, FILE *output) {
    fprintf(output, "User %d compra a monto %d\n", nuevaCompra.cuenta, nuevaCompra.monto);
    pushCompra(compras, nuevaCompra, comprasSize);
    while (*comprasSize > 0 && *ventasSize > 0 && compras[0].monto >= ventas[0].monto) {
        Orden compra = popCompra(compras, comprasSize);
        Orden venta = popVenta(ventas, ventasSize);
        fprintf(output, "Orden Ejecutada: %d -> %d: %d\n", venta.cuenta, compra.cuenta, compra.monto); // Corregido para usar el monto correcto
    }
}

void processSell(Orden *compras, Orden *ventas, int *comprasSize, int *ventasSize, Orden nuevaVenta, FILE *output) {
    fprintf(output, "User %d vende a monto %d\n", nuevaVenta.cuenta, nuevaVenta.monto);
    pushVenta(ventas, nuevaVenta, ventasSize);
    while (*comprasSize > 0 && *ventasSize > 0 && compras[0].monto >= ventas[0].monto) {
        Orden compra = popCompra(compras, comprasSize);
        Orden venta = popVenta(ventas, ventasSize);
        fprintf(output, "Orden Ejecutada: %d -> %d: %d\n", venta.cuenta, compra.cuenta, venta.monto); // Corregido para usar el monto correcto
    }
}


void processStatus(Orden *compras, Orden *ventas, int *comprasSize, int *ventasSize, FILE *output) {
    if (*comprasSize == 0 && *ventasSize == 0) {
        fprintf(output, "Mercado inactivo: No hay registros de transacciones.\n");
    } else {
        fprintf(output, "Estado del mercado\n");
        if (*comprasSize > 0) {
            fprintf(output, "\t%d por %d\n", compras[0].monto, compras[0].cuenta);
        }
        if (*comprasSize > 0 && *ventasSize > 0) {
            fprintf(output, "\tSPREAD %d\n", ventas[0].monto - compras[0].monto);
        }
        if (*ventasSize > 0) {
            fprintf(output, "\t%d por %d\n", ventas[0].monto, ventas[0].cuenta);
        }
    }
}
