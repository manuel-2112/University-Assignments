#include <stdio.h>
#include <stdlib.h>

#include "tree_operations.h"

// Implementación de BST

TreeNode* insertBST(TreeNode *node, Head *head) {
    if (node == NULL) {
        TreeNode *temp = (TreeNode *)malloc(sizeof(TreeNode));
        temp->head = head;
        temp->left = temp->right = NULL;
        return temp;
    }
    if (head->id < node->head->id) {
        node->left = insertBST(node->left, head);
    } else if (head->id > node->head->id) {
        node->right = insertBST(node->right, head);
    }
    return node;
}

TreeNode* searchBST(TreeNode *node, int id) {
    if (node == NULL || node->head->id == id) {
        return node;
    }
    if (id < node->head->id) {
        return searchBST(node->left, id);
    }
    return searchBST(node->right, id);
}

TreeNode* insertYearBST(TreeNode *node, Head *head) {
    if (node == NULL) {
        TreeNode *temp = (TreeNode *)malloc(sizeof(TreeNode));
        temp->head = head;
        temp->left = temp->right = temp->next = NULL;
        return temp;
    }
    if (head->year < node->head->year) {
        node->left = insertYearBST(node->left, head);
    } else if (head->year > node->head->year) {
        node->right = insertYearBST(node->right, head);
    } else {
        TreeNode *temp = node;
        while (temp->next) {
            temp = temp->next;
        }
        temp->next = (TreeNode *)malloc(sizeof(TreeNode));
        temp->next->head = head;
        temp->next->left = temp->next->right = temp->next->next = NULL;
    }
    return node;
}

void searchYearBST(TreeNode *node, int year, FILE *output) {
    int count = 0; // Inicializa un contador de resultados
    _searchYearBST(node, year, output, &count); // Llama a una función auxiliar para contar y listar los resultados
    if (count == 0) {
        fprintf(output, "WITH-YEAR %d: 0\n", year); // Si no se encontraron resultados, imprime 0
    }
}

// Función auxiliar que realiza la búsqueda y cuenta los resultados
void _searchYearBST(TreeNode *node, int year, FILE *output, int *count) {
    if (node == NULL) return; // Caso base: si el nodo es NULL, simplemente retorna

    if (year < node->head->year) {
        _searchYearBST(node->left, year, output, count); // Búsqueda en el subárbol izquierdo
    } else if (year > node->head->year) {
        _searchYearBST(node->right, year, output, count); // Búsqueda en el subárbol derecho
    } else {
        for (TreeNode *temp = node; temp != NULL; temp = temp->next) {
            (*count)++; // Incrementa el contador por cada cabeza encontrada
        }
        fprintf(output, "WITH-YEAR %d: %d\n", year, *count); // Imprime el número de resultados encontrados
        for (TreeNode *temp = node; temp != NULL; temp = temp->next) {
            fprintf(output, "%d %s\n", temp->head->id, temp->head->name); // Imprime cada cabeza encontrada
        }
    }
}

YearRegionNode* insertYearRegion(YearRegionNode *node, Head *head) {
    if (node == NULL) {
        YearRegionNode *temp = (YearRegionNode *)malloc(sizeof(YearRegionNode));
        temp->year = head->year;
        temp->region = head->region;
        temp->head = head;
        head->next = NULL;  // Asegura que el último elemento de la lista apunte a NULL
        temp->left = temp->right = NULL;
        return temp;
    }
    if (head->year < node->year || (head->year == node->year && head->region < node->region)) {
        node->left = insertYearRegion(node->left, head);
    } else if (head->year > node->year || (head->year == node->year && head->region > node->region)) {
        node->right = insertYearRegion(node->right, head);
    } else {
        // Añadir al final de la lista para mantener el orden de llegada
        Head *last = node->head;
        while (last->next != NULL) {  // Recorrer hasta el final de la lista
            last = last->next;
        }
        last->next = head;
        head->next = NULL;
    }
    return node;
}

void searchYearRegion(YearRegionNode *node, int year, int region, FILE *output) {
    int count = 0; // Inicializa el contador de cabezas encontradas
    _searchYearRegion(node, year, region, &count, output);
    if (count == 0) {
        fprintf(output, "WITH-YEAR-DISTRICT %d %d: 0\n", year, region); // Imprime que no hay resultados si count es 0
    }
}

void _searchYearRegion(YearRegionNode *node, int year, int region, int *count, FILE *output) {
    if (node == NULL) return;

    if (year < node->year || (year == node->year && region < node->region)) {
        _searchYearRegion(node->left, year, region, count, output);
    } else if (year > node->year || (year == node->year && region > node->region)) {
        _searchYearRegion(node->right, year, region, count, output);
    } else {
        // Nodo encontrado, contar y listar las cabezas
        Head *h = node->head;
        while (h) {
            (*count)++;
            h = h->next;
        }
        fprintf(output, "WITH-YEAR-DISTRICT %d %d: %d\n", year, region, *count);
        h = node->head;
        while (h) {
            fprintf(output, "%d %s\n", h->id, h->name);
            h = h->next;
        }
    }
}



void freeTree(TreeNode *node) {
    if (node != NULL) {
        freeTree(node->left);
        freeTree(node->right);
        free(node);
    }
}

void freeYearRegionTree(YearRegionNode *node) {
    if (node == NULL) {
        return;
    }

    freeYearRegionTree(node->left);
    freeYearRegionTree(node->right);

    Head *current = node->head;
    while (current) {
        Head *next = current->next;
        free(current);
        current = next;
    }
    free(node);
}