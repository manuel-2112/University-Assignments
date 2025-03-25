CC=gcc
CFLAGS=-Wall -g
LDFLAGS=
OBJFILES=main.o tree_operations.o utils.o
TARGET=hsearch

all: $(TARGET)

$(TARGET): $(OBJFILES)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJFILES) $(LDFLAGS)

main.o: main.c heads.h tree_operations.h utils.h
	$(CC) $(CFLAGS) -c main.c

tree_operations.o: tree_operations.c tree_operations.h heads.h
	$(CC) $(CFLAGS) -c tree_operations.c

utils.o: utils.c utils.h
	$(CC) $(CFLAGS) -c utils.c

clean:
	rm -f $(OBJFILES) $(TARGET)

.PHONY: all clean
