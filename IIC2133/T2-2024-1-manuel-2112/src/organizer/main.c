#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define PACKAGE_SIZE 3

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

typedef struct {
    char id;
    char matrix[PACKAGE_SIZE][PACKAGE_SIZE];
} Package;

bool can_place_package(char **compartment, int rows, int cols, char package[PACKAGE_SIZE][PACKAGE_SIZE], int row, int col) {
    for (int i = 0; i < PACKAGE_SIZE; i++) {
        for (int j = 0; j < PACKAGE_SIZE; j++) {
            if (package[i][j] == '1') {
                if (row + i >= rows || col + j >= cols || compartment[row + i][col + j] != '1') {
                    return false;
                }
            }
        }
    }
    return true;
}

void place_package(char **compartment, char package[PACKAGE_SIZE][PACKAGE_SIZE], int row, int col, char package_id) {
    for (int i = 0; i < PACKAGE_SIZE; i++) {
        for (int j = 0; j < PACKAGE_SIZE; j++) {
            if (package[i][j] == '1') {
                compartment[row + i][col + j] = package_id;
            }
        }
    }
}

void remove_package(char **compartment, char package[PACKAGE_SIZE][PACKAGE_SIZE], int row, int col) {
    for (int i = 0; i < PACKAGE_SIZE; i++) {
        for (int j = 0; j < PACKAGE_SIZE; j++) {
            if (package[i][j] == '1') {
                compartment[row + i][col + j] = '1';
            }
        }
    }
}

bool place_packages(char **compartment, int rows, int cols, Package packages[], int n_packages, int current_package) {
    if (current_package == n_packages) {
        return true;
    }

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (can_place_package(compartment, rows, cols, packages[current_package].matrix, i, j)) {
                place_package(compartment, packages[current_package].matrix, i, j, packages[current_package].id);
                if (place_packages(compartment, rows, cols, packages, n_packages, current_package + 1)) {
                    return true;
                }
                remove_package(compartment, packages[current_package].matrix, i, j);
            }
        }
    }
    return false;
}

int main(int argc, char **argv) {
    check_arguments(argc, argv);

    FILE *input_file = fopen(argv[1], "r");
    FILE *output_file = fopen(argv[2], "w");
    
    if (input_file == NULL) {
        perror("Error al abrir el archivo de entrada");
        exit(EXIT_FAILURE);
    }
    
    if (output_file == NULL) {
        perror("Error al abrir el archivo de salida");
        fclose(input_file);
        exit(EXIT_FAILURE);
    }

    int rows, cols;
    fscanf(input_file, "%d %d", &rows, &cols);

    char **compartment = malloc(rows * sizeof(char *));
    for (int i = 0; i < rows; i++) {
        compartment[i] = malloc((cols + 1) * sizeof(char));
        for (int j = 0; j < cols; j++) {
            int value;
            fscanf(input_file, "%d", &value);
            compartment[i][j] = value == 1 ? '1' : '0';
        }
        compartment[i][cols] = '\0';
    }

    int n_packages;
    fscanf(input_file, "%d", &n_packages);

    Package packages[n_packages];

    for (int i = 0; i < n_packages; i++) {
        fscanf(input_file, " %c", &packages[i].id);
        for (int j = 0; j < PACKAGE_SIZE; j++) {
            for (int k = 0; k < PACKAGE_SIZE; k++) {
                int value;
                fscanf(input_file, "%d", &value);
                packages[i].matrix[j][k] = value == 1 ? '1' : '0';
            }
        }
    }

    if (place_packages(compartment, rows, cols, packages, n_packages, 0)) {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                fprintf(output_file, "%c", compartment[i][j]);
                if (j < cols - 1) {
                    fprintf(output_file, " ");
                }
            }
            fprintf(output_file, "\n");
            free(compartment[i]);
        }
    } else {
        fprintf(output_file, "No se puede encontrar una solución válida\n");
    }

    free(compartment);
    fclose(input_file);
    fclose(output_file);

    return 0;
}
