import requests
from datetime import datetime
import time

BASE_URL = "https://www.fia.cl/wp-json/convocatorias/v1/filtro"

def insert_event(event_data):
    api_url = "https://doberty.me/api/events"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(api_url, json=event_data, headers=headers)
    if response.status_code == 201:
        print(f"Event inserted successfully: {response.json()}")
    else:
        print(f"Failed to insert event: {response.text}")

def convert_date(date_str):
    try:
        # Parse the date string into a datetime object
        date_obj = datetime.strptime(date_str, "%d/%m/%Y")
        # Format the datetime object into the desired ISO 8601 format
        iso_date_str = date_obj.strftime("%Y-%m-%dT00:00:00Z")
        return iso_date_str
    except ValueError:
        return None

def get_event_data():
    url = BASE_URL 
    
    current_year = datetime.now().year

    params_convocatoria_nacional = {
        "year": current_year,
        "status": 5, #5 = todas, 0 = abierta, 4 = cerrada
        "national": 0, #0 = nacional, 1 = regional
        "page": 1,
        "category": 13 #13 = convocatoria, 25 = licitacion
    }

    params_convocatoria_regional = {
        "year": current_year,
        "status": 5,
        "national": 1,
        "page": 1,
        "category": 13
    }

    params_licitacion_nacional = {
        "year": current_year,
        "status": 5,
        "national": 0,
        "page": 1,
        "category": 25
    }

    params_licitacion_regional = {
        "year": current_year,
        "status": 5,
        "national": 1,
        "page": 1,
        "category": 25
    }




    response = ''
    while response == '':
        try:
            response = requests.post(url, params=params_convocatoria_nacional)
            break
        except:
            print("Connection refused by the server..")
            print("Let me sleep for 5 seconds")
            print("ZZzzzz...")
            time.sleep(5)
            print("Was a nice sleep, now let me continue...")
            continue
    
    

    if response.status_code != 200:
        print(f"Error: {response.status_code}")
    else:
        print("Request successful")
        response_json = response.json()  # Parse the JSON response
        
        formatted_data = []
        for event in response_json.get('d', []):
            evento = {
                "name": event["title"],
                "initialDate": convert_date(event["data_start"]),
                "finalDate": convert_date(event["data_close"]),
                "url": event["url"],
                "type": "Convocatoria",
                "status": "Pendiente"
            }
            insert_event(evento)
            formatted_data.append(evento)
            
        # # Save the transformed data to a file
        # with open('convocatorias_nacionales.json', 'w') as json_file:
        #     json.dump(formatted_data, json_file, indent=4)
        # insert_event(formatted_data)
        # print(f"Response saved to {'convocatorias_nacionales.json'}")


    response = requests.post(url, params=params_convocatoria_regional)
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}")
    else:
        print("Request successful")
        response_json = response.json()  # Parse the JSON response
                
        formatted_data = []
        for event in response_json.get('d', []):
            evento = {
                "name": event["title"],
                "initialDate": convert_date(event["data_start"]),
                "finalDate": convert_date(event["data_close"]),
                "url": event["url"],
                "type": "Convocatoria",
                "status": "Pendiente"
            }
            insert_event(evento)
            formatted_data.append(evento)
        # Save the JSON response to a file
        # with open('convocatorias_regionales.json', 'w') as json_file:
        #     json.dump(formatted_data, json_file, indent=4)
        # print("Response saved to response.json")
        
    response = requests.post(url, params=params_licitacion_nacional)
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}")
    else:
        print("Request successful")
        response_json = response.json()  # Parse the JSON response
                
        formatted_data = []
        for event in response_json.get('d', []):
            evento = {
                "name": event["title"],
                "initialDate": convert_date(event["data_start"]),
                "finalDate": convert_date(event["data_close"]),
                "url": event["url"],
                "type": "Licitacion",
                "status": "Pendiente"
            }
            insert_event(evento)
            formatted_data.append(evento)
        # Save the JSON response to a file
        # with open('licitaciones_nacional.json', 'w') as json_file:
        #     json.dump(formatted_data, json_file, indent=4)
        # print("Response saved to response.json")

    response = requests.post(url, params=params_licitacion_regional)
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}")
    else:
        print("Request successful")
        response_json = response.json()  # Parse the JSON response
                
        formatted_data = []
        for event in response_json.get('d', []):
            evento = {
                "name": event["title"],
                "initialDate": convert_date(event["data_start"]),
                "finalDate": convert_date(event["data_close"]),
                "url": event["url"],
                "type": "Licitacion",
                "status": "Pendiente"
            }
            insert_event(evento)
            formatted_data.append(evento)
        # Save the JSON response to a file
        # with open('licitaciones_regionales.json', 'w') as json_file:
        #     json.dump(formatted_data, json_file, indent=4)
        # print("Response saved to response.json")





# Call the function to test it
get_event_data()