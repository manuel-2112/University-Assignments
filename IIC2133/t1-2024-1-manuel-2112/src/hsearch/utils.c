#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "utils.h"

/* Retorna true si ambos strings son iguales */
bool string_equals(char *string1, char *string2) {
  return strcmp(string1, string2) == 0;
}

bool check_arguments(int argc, char **argv) {
  if (argc != 3) {
    printf("Modo de uso: %s INPUT OUTPUT\n", argv[0]);
    printf("Donde:\n");
    printf("\tINPUT es la ruta del archivo de input\n");
    printf("\tOUTPUT es la ruta del archivo de output\n");
    exit(1);
  }
  return true;
}