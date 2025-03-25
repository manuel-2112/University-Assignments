#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_N 10000

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

unsigned long long compute_hash(const char *tree, int pos, int height, int n) {
    if (pos >= n) return 0;
    if (height == 0) {
        return tree[pos];
    }
    int left_child = pos * 2 + 1;
    int right_child = pos * 2 + 2;
    unsigned long long left_hash = compute_hash(tree, left_child, height - 1, n);
    unsigned long long right_hash = compute_hash(tree, right_child, height - 1, n);
    unsigned long long result = ((left_hash * 31) + tree[pos]) * 31 + right_hash;
    return result;
}

bool matches_at(const char *tree, const char *pattern, int pos, int height, int n, int m) {
    unsigned long long tree_hash = compute_hash(tree, pos, height, n);
    unsigned long long pattern_hash = compute_hash(pattern, 0, height, m);
    return tree_hash == pattern_hash;
}

int main(int argc, char **argv) {
    check_arguments(argc, argv);

    FILE *input_file = fopen(argv[1], "r");
    if (input_file == NULL) {
        perror("Error al abrir el archivo de input");
        return EXIT_FAILURE;
    }

    FILE *output_file = fopen(argv[2], "w");
    if (output_file == NULL) {
        perror("Error al abrir el archivo de output");
        fclose(input_file);
        return EXIT_FAILURE;
    }

    int N_NODOS;
    fscanf(input_file, "%d\n", &N_NODOS);

    char arbol[MAX_N + 1];
    fscanf(input_file, "%s\n", arbol);

    int N_CONSULTAS;
    fscanf(input_file, "%d\n", &N_CONSULTAS);

    for (int i = 0; i < N_CONSULTAS; i++) {
        int N_NODOS_CONSULTA;
        fscanf(input_file, "%d\n", &N_NODOS_CONSULTA);
        char consulta[MAX_N + 1];
        fscanf(input_file, "%s\n", consulta);

        int height = 0;
        while ((1 << (height + 1)) - 1 < N_NODOS_CONSULTA) height++;

        bool found = false;
        for (int j = 0; j <= N_NODOS - N_NODOS_CONSULTA; j++) {
            if (matches_at(arbol, consulta, j, height, N_NODOS, N_NODOS_CONSULTA)) {
                if (found) fprintf(output_file, " ");
                fprintf(output_file, "%d", j);
                found = true;
            }
        }
        if (!found) {
            fprintf(output_file, "-1");
        }
        fprintf(output_file, "\n");
    }

    fclose(input_file);
    fclose(output_file);

    return 0;
}
