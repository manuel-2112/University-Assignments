#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include "heap_utilities.h"

// Función auxiliar para intercambiar dos órdenes
void swap(Orden *a, Orden *b) {
    Orden temp = *a;
    *a = *b;
    *b = temp;
}

// Subir elemento en max-heap
void siftUpMax(Orden heap[], int idx) {
    while (idx > 0) {
        int parent_idx = (idx - 1) / 2;
        bool shouldSwap = heap[parent_idx].monto < heap[idx].monto ||
                          (heap[parent_idx].monto == heap[idx].monto && heap[parent_idx].timestamp > heap[idx].timestamp);
        if (shouldSwap) {
            swap(&heap[parent_idx], &heap[idx]);
            idx = parent_idx;
        } else {
            break;
        }
    }
}

// Bajar elemento en max-heap
void siftDownMax(Orden heap[], int idx, int size) {
    int largest = idx;
    int left = 2 * idx + 1;
    int right = 2 * idx + 2;

    if (left < size && (heap[left].monto > heap[largest].monto ||
                        (heap[left].monto == heap[largest].monto && heap[left].timestamp < heap[largest].timestamp))) {
        largest = left;
    }
    if (right < size && (heap[right].monto > heap[largest].monto ||
                         (heap[right].monto == heap[largest].monto && heap[right].timestamp < heap[largest].timestamp))) {
        largest = right;
    }
    if (largest != idx) {
        swap(&heap[idx], &heap[largest]);
        siftDownMax(heap, largest, size);
    }
}

// Subir elemento en min-heap
void siftUpMin(Orden heap[], int idx) {
    while (idx > 0) {
        int parent_idx = (idx - 1) / 2;
        bool shouldSwap = heap[parent_idx].monto > heap[idx].monto ||
                          (heap[parent_idx].monto == heap[idx].monto && heap[parent_idx].timestamp > heap[idx].timestamp);
        if (shouldSwap) {
            swap(&heap[parent_idx], &heap[idx]);
            idx = parent_idx;
        } else {
            break;
        }
    }
}

// Bajar elemento en min-heap
void siftDownMin(Orden heap[], int idx, int size) {
    int smallest = idx;
    int left = 2 * idx + 1;
    int right = 2 * idx + 2;

    if (left < size && (heap[left].monto < heap[smallest].monto ||
                        (heap[left].monto == heap[smallest].monto && heap[left].timestamp < heap[smallest].timestamp))) {
        smallest = left;
    }
    if (right < size && (heap[right].monto < heap[smallest].monto ||
                         (heap[right].monto == heap[smallest].monto && heap[right].timestamp < heap[smallest].timestamp))) {
        smallest = right;
    }
    if (smallest != idx) {
        swap(&heap[idx], &heap[smallest]);
        siftDownMin(heap, smallest, size);
    }
}

// Insertar en max-heap
void pushCompra(Orden heap[], Orden orden, int *size) {
    heap[*size] = orden;
    siftUpMax(heap, *size);
    (*size)++;
}

// Insertar en min-heap
void pushVenta(Orden heap[], Orden orden, int *size) {
    heap[*size] = orden;
    siftUpMin(heap, *size);
    (*size)++;
}

// Extraer de max-heap
Orden popCompra(Orden heap[], int *size) {
    Orden top = heap[0];
    heap[0] = heap[--(*size)];
    siftDownMax(heap, 0, *size);
    return top;
}

// Extraer de min-heap
Orden popVenta(Orden heap[], int *size) {
    Orden top = heap[0];
    heap[0] = heap[--(*size)];
    siftDownMin(heap, 0, *size);
    return top;
}
