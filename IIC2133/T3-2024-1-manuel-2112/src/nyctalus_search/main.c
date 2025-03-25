#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int minCerebros(int planetas[], int n, int R) {
    qsort(planetas, n, sizeof(int), compare); // Ordenar los planetas
    int cerebros = 0;
    int i = 0;

    while (i < n) {
        cerebros++;
        int loc = planetas[i] + R;
        while (i < n && planetas[i] <= loc) i++;
        loc = planetas[--i] + R;
        while (i < n && planetas[i] <= loc) i++;
        i++;
    }

    return cerebros;
}

int main(int argc, char **argv) {
    check_arguments(argc, argv);

    FILE *input_file = fopen(argv[1], "r");
    FILE *output_file = fopen(argv[2], "w");

    int CANT_PLANETAS;
    fscanf(input_file, "%d", &CANT_PLANETAS);

    int *POSICIONES_PLANETAS = (int *)malloc(CANT_PLANETAS * sizeof(int));
    //Leer las posiciones p_i de los planetas y alocarlos en un array 
    for (int q = 0; q < CANT_PLANETAS; q++) {
        fscanf(input_file, "%d", &POSICIONES_PLANETAS[q]);
    }

    // Leer el Rango
    int RANGO;
    fscanf(input_file, "%d", &RANGO);

    //Implementa aquí tu tarea
    int resultado = minCerebros(POSICIONES_PLANETAS, CANT_PLANETAS, RANGO);
    fprintf(output_file, "%d\n", resultado);
    
    free(POSICIONES_PLANETAS);

    /* Cerrar archivos */
    fclose(input_file);
    fclose(output_file);

    return 0;
}
