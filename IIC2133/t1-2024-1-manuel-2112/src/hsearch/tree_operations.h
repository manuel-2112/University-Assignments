#ifndef TREE_OPERATIONS_H
#define TREE_OPERATIONS_H

#include "heads.h"

typedef struct TreeNode {
    Head *head;
    struct TreeNode *left, *right;
    struct TreeNode *next;
} TreeNode;

typedef struct YearRegionNode {
    int year;
    int region;
    Head *head;
    struct YearRegionNode *left, *right;
    int height;
} YearRegionNode;


TreeNode* insertBST(TreeNode *node, Head *head);
TreeNode* searchBST(TreeNode *node, int id);

TreeNode* insertYearBST(TreeNode *node, Head *head);
void searchYearBST(TreeNode *node, int year, FILE *output);

YearRegionNode* insertYearRegion(YearRegionNode *node, Head *head);
void searchYearRegion(YearRegionNode *node, int year, int region, FILE *output);

void freeTree(TreeNode *node);
void freeYearRegionTree(YearRegionNode *node);

#endif
