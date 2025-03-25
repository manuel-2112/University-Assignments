#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>

#define NO_OF_CHARS 4

int charToIndex(char c) {
    switch (c) {
        case 'A': return 0;
        case 'G': return 1;
        case 'T': return 2;
        case 'C': return 3;
        default: return -1;
    }
}

void badCharHeuristic(char *str, int size, int badchar[NO_OF_CHARS]) {
    int i;
    for (i = 0; i < NO_OF_CHARS; i++) {
        badchar[i] = -1;
    }
    for (i = 0; i < size; i++) {
        badchar[charToIndex(str[i])] = i;
    }
}

void boyer_moore_search(char *pat, char *txt, FILE *output_file) {
    int m = strlen(pat);
    int n = strlen(txt);

    int badchar[NO_OF_CHARS];
    badCharHeuristic(pat, m, badchar);

    int s = 0;
    bool found = false;
    while (s <= (n - m)) {
        int j = m - 1;

        while (j >= 0 && pat[j] == txt[s + j]) {
            j--;
        }

        if (j < 0) {
            fprintf(output_file, "%d\n", s);
            found = true;
            s += (s + m < n) ? m - badchar[charToIndex(txt[s + m])] : 1;
        } else {
            s += ((j - badchar[charToIndex(txt[s + j])]) > 1) ? (j - badchar[charToIndex(txt[s + j])]) : 1;
        }
    }

    if (!found) {
        fprintf(output_file, "");
    }
}

void brute_force_search(char pat[], char txt[], FILE *output_file) {
    int M = strlen(pat);
    int N = strlen(txt);
    bool found = false;

    for (int i = 0; i <= N - M; i++) {
        int j;
        for (j = 0; j < M; j++) {
            if (txt[i + j] != pat[j])
                break;
        }

        if (j == M) {
            fprintf(output_file, "%d\n", i);
            found = true;
        }
    }

    if (!found) {
        fprintf(output_file, "");
    }
}

void rabin_karp_search(char pat[], char txt[], int q, FILE *output_file) {
    int M = strlen(pat);
    int N = strlen(txt);
    int i, j;
    int p = 0;
    int t = 0;
    int h = 1;
    int d = 256;

    for (i = 0; i < M - 1; i++)
        h = (h * d) % q;

    for (i = 0; i < M; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }
    bool found = false;
    for (i = 0; i <= N - M; i++) {
        if (p == t) {
            for (j = 0; j < M; j++) {
                if (txt[i + j] != pat[j])
                    break;
            }
            if (j == M) {
                fprintf(output_file, "%d\n", i);
                found = true;
            }
        }
        if (i < N - M) {
            t = (d * (t - txt[i] * h) + txt[i + M]) % q;
            if (t < 0)
                t = (t + q);
        }
    }

    if (!found) {
        fprintf(output_file, "");
    }
}

int main(int argc, char **argv) {
    if (argc != 3) {
        printf("Modo de uso: %s INPUT OUTPUT\n", argv[0]);
        printf("Donde:\n");
        printf("\tINPUT es la ruta del archivo de input\n");
        printf("\tOUTPUT es la ruta del archivo de output\n");
        exit(1);
    }

    FILE *input_file = fopen(argv[1], "r");
    FILE *output_file = fopen(argv[2], "w");

    int TAMANO_DOCUMENTO;
    fscanf(input_file, "%d", &TAMANO_DOCUMENTO);

    char documento[TAMANO_DOCUMENTO + 1];
    fscanf(input_file, "%s", documento);

    int largo_cadena, cantidad_consultas;
    fscanf(input_file, "%d", &largo_cadena);
    fscanf(input_file, "%d", &cantidad_consultas);

    for (int q_index = 0; q_index < cantidad_consultas; q_index++) {
        char cadena[largo_cadena + 1];
        fscanf(input_file, "%s", cadena);

        fprintf(output_file, "Consulta %d\n", q_index);
        
        if (TAMANO_DOCUMENTO < 1000) {
            brute_force_search(cadena, documento, output_file);
        } else if (largo_cadena > 25) {
            boyer_moore_search(cadena, documento, output_file);
        } else {
            rabin_karp_search(cadena, documento, 101, output_file);
        }
    }

    /* Cerrar archivos */
    fclose(input_file);
    fclose(output_file);

    return 0;
}