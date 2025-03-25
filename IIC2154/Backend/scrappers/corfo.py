import requests
from bs4 import BeautifulSoup
from datetime import datetime

BASE_URL = "https://www.corfo.cl/sites/ContentServer?d=&pagename=se_busquedaConvocatoria&strKeyWord=&order=fa&data0=pullEstado-abierta&idPadre=1456411096587&funcSearch=funcSearch&pag="

def convert_date(date_str):
    try:
        date_obj = datetime.strptime(date_str, "%d/%m/%Y")
        iso_date_str = date_obj.strftime("%Y-%m-%dT00:00:00Z")
        return iso_date_str
    except ValueError:
        return None

def get_event_data(page_number):
    url = BASE_URL + str(page_number)
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Error fetching page {page_number}")
        return []

    soup = BeautifulSoup(response.content, 'html.parser')
    events = []

    results = soup.find_all('div', class_='caja-resultados_uno')
    print(f"Found {len(results)} events on page {page_number}")
    if len(results) > 1:
        for result in results:
            link = result.find('div', class_='foot-caja_result')
            links = link.find_all('p')
            result = result.find('div', class_='contenido-caja_prog')
            titulo = result.find('div', class_='contenido-cajas_fechas')
            title_div = titulo.find('div', class_='titulo-cajas_fechas')
            title_h4 = title_div.find('h4') if title_div else None
            title = title_h4.get_text(strip=True) if title_h4 else 'No title'
            location_h5 = result.find('h5')
            location_em = location_h5.find('em') if location_h5 else None
            location_em = location_em.get_text(strip=True).replace('Alcance: ', '') if location_h5 else 'No location'
            open_date_div = result.find('div', class_='apertura')
            open_date = open_date_div.find('span').get_text(strip=True) if open_date_div and open_date_div.find('span') else 'No open date'
            close_date_div = result.find('div', class_='cierre')
            close_date = close_date_div.find('span').get_text(strip=True) if close_date_div and close_date_div.find('span') else 'No close date'
            more_info_link = 'https://www.corfo.cl' + links[0].find('a').get('href') if links else 'No more info link'

            open_date_iso = convert_date(open_date)
            close_date_iso = convert_date(close_date)

            event = {
                'name': title,
                'initialDate': open_date_iso,
                'finalDate': close_date_iso,
                'url': more_info_link,
                'type': 'Convocatoria',
                'status': 'Pendiente'
            }

            events.append(event)

    return events

def scrape_all_events():
    all_events = []
    page_number = 0
    while True:
        events = get_event_data(page_number)
        print(events)
        if not events:
            break
        all_events.extend(events)
        page_number += 1

    return all_events

def insert_event(event_data):
    api_url = "https://doberty.me/api/events"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(api_url, json=event_data, headers=headers)
    if response.status_code == 201:
        print(f"Event inserted successfully: {response.json()}")
    else:
        print(f"Failed to insert event: {response.text}")

if __name__ == "__main__":
    events = scrape_all_events()
    for event in events:
        insert_event(event)
