#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "heads.h"
#include "tree_operations.h"
#include "utils.h"

int main(int argc, char **argv) {
    check_arguments(argc, argv);

    FILE *input_file = fopen(argv[1], "r");
    FILE *output_file = fopen(argv[2], "w");

    TreeNode *idTree = NULL;
    TreeNode *yearTree = NULL;
    YearRegionNode *yearRegionTree = NULL;

    int N_HEADS;
    fscanf(input_file, "%d\n", &N_HEADS);
    for (int i = 0; i < N_HEADS; i++) {
      Head *head = (Head *)malloc(sizeof(Head));
      fscanf(input_file, "SAVE %d %s %d %d %d %d\n", &head->id, head->name, &head->year, &head->region, &head->x, &head->y);
      idTree = insertBST(idTree, head);
      yearTree = insertYearBST(yearTree, head);
      yearRegionTree = insertYearRegion(yearRegionTree, head); 
    }

    int N_BUSQUEDAS, id, year, region;
    fscanf(input_file, "%d\n", &N_BUSQUEDAS);
    char command[32];

    for (int i = 0; i < N_BUSQUEDAS; i++) {
      fscanf(input_file, "%s", command);
      
      if (strcmp(command, "WITH-ID") == 0) {
        fscanf(input_file, "%d", &id);
        TreeNode *result = searchBST(idTree, id);
        if (result) {
          fprintf(output_file, "WITH-ID %d: 1\n", id);
          fprintf(output_file, "%d %s\n", result->head->id, result->head->name);
        } else {
          fprintf(output_file, "WITH-ID %d: 0\n", id);
        }
      } else if (strcmp(command, "WITH-YEAR") == 0) {
        fscanf(input_file, "%d", &year);
        searchYearBST(yearTree, year, output_file);
      } else if (strcmp(command, "WITH-YEAR-DISTRICT") == 0) {
          fscanf(input_file, "%d %d", &year, &region);
          searchYearRegion(yearRegionTree, year, region, output_file);
      }
      
    }


    freeTree(idTree);
    freeTree(yearTree);
    freeYearRegionTree(yearRegionTree);

    fclose(input_file);
    fclose(output_file);
    return 0;
}