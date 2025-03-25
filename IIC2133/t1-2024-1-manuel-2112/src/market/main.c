#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "heap_utilities.h"
#include "market_operations.h"
#include "order_struct.h"

// Estructuras para los heaps
Orden *compras; // Max-heap para órdenes de compra
Orden *ventas;  // Min-heap para órdenes de venta
int comprasSize = 0, ventasSize = 0;

/* Retorna true si ambos strings son iguales */
static bool string_equals(char *string1, char *string2) {
  return !strcmp(string1, string2);
}

static bool check_arguments(int argc, char **argv) {
  if (argc != 3) {
    printf("Modo de uso: %s INPUT OUTPUT\n", argv[0]);
    printf("Donde:\n");
    printf("\tINPUT es la ruta del archivo de input\n");
    printf("\tOUTPUT es la ruta del archivo de output\n");
    exit(1);
  }
  return true;
}

int main(int argc, char **argv) {
  check_arguments(argc, argv);

  FILE *input_file = fopen(argv[1], "r");
  FILE *output_file = fopen(argv[2], "w");

  int N_EVENTOS;
  int result = fscanf(input_file, "%d", &N_EVENTOS);
  if (result != 1) {
      printf("Error leyendo la cantidad de eventos\n");
      return 1;
  }

  compras = malloc(N_EVENTOS * sizeof(Orden));
  ventas = malloc(N_EVENTOS * sizeof(Orden));

  int nextTimestamp = 0;

  char command[32];
  int monto, cuenta;
  for (int i = 0; i < N_EVENTOS; i++) {
      fscanf(input_file, "%s", command);
      if (string_equals(command, "BUY") || string_equals(command, "SELL")) {
          fscanf(input_file, "%d %d", &monto, &cuenta);
          Orden orden = {monto, cuenta, nextTimestamp++};
          if (string_equals(command, "BUY")) {
              processBuy(compras, ventas, &comprasSize, &ventasSize, orden, output_file);
          } else {
              processSell(compras, ventas, &comprasSize, &ventasSize, orden, output_file);
          }
      } else if (string_equals(command, "STATUS")) {
          processStatus(compras, ventas, &comprasSize, &ventasSize, output_file);
      } else {
          fprintf(output_file, "EVENTO NO ENCONTRADO: %s\n", command);
      }
  }

  // Cerrar archivos y liberar memoria
  fclose(input_file);
  fclose(output_file);
  
  free(compras);
  free(ventas);

  return 0;
}
