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

int minBasurales(int basurales[], int n, int M) {
    int INF = M + 1;
    int *dp = (int *)malloc((M + 1) * sizeof(int));

    for (int i = 0; i <= M; i++) {
        dp[i] = INF;
    }
    dp[0] = 0;
    
    for (int i = 0; i < n; i++) {
        for (int j = basurales[i]; j <= M; j++) {
            if (dp[j - basurales[i]] != INF) {
                dp[j] = dp[j] < dp[j - basurales[i]] + 1 ? dp[j] : dp[j - basurales[i]] + 1;
            }
        }
    }

    int result = dp[M] == INF ? -1 : dp[M];
    free(dp);
    return result;
}

int main(int argc, char **argv) {
    check_arguments(argc, argv);

    FILE *input_file = fopen(argv[1], "r");
    FILE *output_file = fopen(argv[2], "w");

    int NUM_BASURALES;
    fscanf(input_file, "%d", &NUM_BASURALES);

    int *basurales = (int *)malloc(NUM_BASURALES * sizeof(int));
    // Leer los basurales
    for (int q = 0; q < NUM_BASURALES; q++) {
        fscanf(input_file, "%d", &basurales[q]);
    }
  
    int NUM_A_SUMAR;
    fscanf(input_file, "%d", &NUM_A_SUMAR);
    
    int resultado = minBasurales(basurales, NUM_BASURALES, NUM_A_SUMAR);

    // Escribir el resultado en el archivo de salida
    fprintf(output_file, "%d", resultado);

    // Liberar memoria
    free(basurales);

    /* Cerrar archivos */
    fclose(input_file);
    fclose(output_file);

    return 0;
}
