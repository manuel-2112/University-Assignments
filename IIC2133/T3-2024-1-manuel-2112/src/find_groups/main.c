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

// Función para realizar DFS y marcar todos los nodos alcanzables desde el nodo u
void DFS(int u, bool *visitado, int **grafo, int N) {
    visitado[u] = true;
    for (int v = 0; v < N; v++) {
        if (grafo[u][v] && !visitado[v]) {
            DFS(v, visitado, grafo, N);
        }
    }
}

int main(int argc, char **argv) {
    check_arguments(argc, argv);

    FILE *input_file = fopen(argv[1], "r");
    FILE *output_file = fopen(argv[2], "w");

    int NODOS_GRAFO;
    fscanf(input_file, "%d", &NODOS_GRAFO);

    int NUM_ARISTAS;
    fscanf(input_file, "%d", &NUM_ARISTAS);

    // Crear una matriz de adyacencia
    int **grafo = (int **)malloc(NODOS_GRAFO * sizeof(int *));
    for (int i = 0; i < NODOS_GRAFO; i++) {
        grafo[i] = (int *)calloc(NODOS_GRAFO, sizeof(int));
    }

    // Leer las aristas y llenar la matriz de adyacencia
    for (int q = 0; q < NUM_ARISTAS; q++) {
        int nodo1, nodo2;
        fscanf(input_file, "%d %d", &nodo1, &nodo2);
        grafo[nodo1][nodo2] = 1;
        grafo[nodo2][nodo1] = 1;
    }

    // Array para marcar nodos visitados
    bool *visitado = (bool *)calloc(NODOS_GRAFO, sizeof(bool));

    // Contar componentes conectados
    int componentes_conectados = 0;
    for (int i = 0; i < NODOS_GRAFO; i++) {
        if (!visitado[i]) {
            DFS(i, visitado, grafo, NODOS_GRAFO);
            componentes_conectados++;
        }
    }

    // Escribir el resultado en el archivo de salida
    fprintf(output_file, "%d\n", componentes_conectados);

    // Liberar memoria
    for (int i = 0; i < NODOS_GRAFO; i++) {
        free(grafo[i]);
    }
    free(grafo);
    free(visitado);

    /* Cerrar archivos */
    fclose(input_file);
    fclose(output_file);

    return 0;
}

