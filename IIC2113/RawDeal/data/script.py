import json
import re

with open('cards.json') as file:
    data = json.load(file)

titles = []
for item in data:
    titles.append(item['Title'])

modified_titles = []
for title in titles:
    # Eliminar caracteres distintos a letras
    modified_title = re.sub(r'[^a-zA-Z\s]', '', title)
    # Capitalizar el título y los espacios en los títulos
    modified_title = modified_title.title().replace(' ', '')
    modified_titles.append(modified_title)

for i in range(len(modified_titles)):
    print(f'if (cardTittle == CardTittle.{modified_titles[i]})')
    print(f'    return {modified_titles[i]};')
    #print(f'{modified_titles[i]},')

subtypes = set()
for item in data:
    subtypes.update(item['Subtypes'])

subtypes_list = list(subtypes)