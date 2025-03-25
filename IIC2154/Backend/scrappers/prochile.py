import requests
from datetime import datetime

def get_event_data():
    events = []
    page_number = 0
    while True:
        response = requests.get(get_event_url(page_number))
        if response.status_code != 200:
            print(f"Error fetching page")
            return events
        data = response.json()
        fetched_events = data.get('value', [])
        if not fetched_events: return events
        for event in fetched_events:
            name = event.get('Title')
            
            open_date_str = event.get('FechaInicioEvento')
            close_date_str = event.get('FechaFinEvento')
            if close_date_str is None or open_date_str is None: continue

            close_date = datetime.strptime(close_date_str, '%Y-%m-%dT%H:%M:%SZ')
            if close_date < datetime.now(): continue
            
            event_url = "https://www.prochile.gob.cl/convocatorias/detalle/" + event.get('UrlName')
            
            event_type = event.get('tiposdeevento')[0].get('Title')
            event_type = format_event_type(event_type)
            
            events.append({
                'name': name,
                'initialDate': open_date_str,
                'finalDate': close_date_str,
                'url': event_url,
                'type': event_type,
                'status': 'Pendiente'
            })
        page_number += 1

def get_event_url(page_number):
    return f"https://www.prochile.gob.cl/api/actividades/actividads?$filter=contains(Title,%27%27)%20and%20macrosector/any(x:x%20eq%2055b28cb3-2218-4079-96ae-ae44834f3c18)%20&$select=Id,UrlName,Title,Bajada,macrosector,ImagenCard,mercado,FechaInicioEvento,FechaFinEvento,PublicationDate,FechaCierrePostulaciones,tipodeevento,tiposdeevento,modalidad,modalidades,LinkDetalleAlternativo,ItemDefaultUrl,region&$expand=ImagenCard,tiposdeevento,modalidades,region&$orderby=PublicationDate%20desc&$skip={page_number * 12}&$top=12&$count=true"

def format_event_type(event_type):
    if event_type == "Feria Internacional": return "Feria"
    elif event_type == "Convocatoria Regional": return "Convocatoria"
    elif event_type == "Licitación": return "Licitacion"
    else: return "Evento"

def insert_event(event_data):
    api_url = "https://doberty.me/api/events"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(api_url, json=event_data, headers=headers)
    if response.status_code == 201:
        print(f"Event inserted successfully: {response.json()}")
    else:
        print(f"Failed to insert event: {response.text}")

if __name__ == "__main__":
    events = get_event_data()
    for event in events:
        insert_event(event)
