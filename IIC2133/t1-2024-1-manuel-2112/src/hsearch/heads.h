#pragma once

typedef struct Head {
  int id;
  char name[64];
  int year;
  int region;
  int x, y;
  struct Head *next;
} Head;
