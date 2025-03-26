from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from fuzzywuzzy import process
from FireStationList import fire_stations  # Importing fire station list
from Responses import responses

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Emergency-related keywords (without asking for location)
fire_related_keywords = [
    "fire at my house", "fire in my building", "fire outbreak", "fire hazard", 
    "electrical fire", "short circuit", "gas leak",
]

# Keywords dictionary for fuzzy matching
keywords = {
    "safety tips": "safety tips",  
    "noc": "noc application",  
    "drill": "fire drill",  
    "gas leak": "gas leak",
    "short circuit": "short circuit",
    "electrical fire": "electrical fire",
    "chemical spill": "chemical spill",
    "nearest fire station": "fire station inquiry",
    "fire station": "fire station inquiry",
    "fire brigade number": "fire brigade number",
    "thanks": "thanks",
    "hi": "greeting",
    "hello": "greeting",
    "hey": "greeting"
}

# Store user state for emergency flows (key: user_id)
user_state = {}

# Function to clean and preprocess user message
def clean_message(message):
    return message.lower().strip()

# Function to handle fire station location inquiries
def get_nearest_fire_station(location):
    location = location.lower().strip()
    if location in fire_stations:
        return fire_stations[location]
    else:
        return "Sorry, I couldn't understand. Please try again !."

@app.route('/', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    cleaned_message = clean_message(user_message)
    user_id = request.json.get('user_id', 'default_user')  # Assume we track users via a user ID

    # Check for fire-related keywords
    for keyword in fire_related_keywords:
        if keyword in cleaned_message:
            if "electrical fire" in cleaned_message:
                return jsonify({'response': random.choice(responses["electrical fire"])})
            elif "short circuit" in cleaned_message:
                return jsonify({'response': random.choice(responses["short circuit"])})
            elif "gas leak" in cleaned_message:
                return jsonify({'response': random.choice(responses["gas leak"])})
            return jsonify({'response': "Please evacuate the building and use our emergency button feature for immediate assistance."})

    # Check if the user is asking for the nearest fire station
    if "fire station" in cleaned_message or "nearest fire station" in cleaned_message:
        # Check if user has already provided a location
        if user_id in user_state and 'location' in user_state[user_id]:
            location = user_state[user_id]['location']
            fire_station_info = get_nearest_fire_station(location)
            return jsonify({'response': fire_station_info})
        else:
            # Ask for the user's location
            user_state[user_id] = {'awaiting_location': True}
            return jsonify({'response': "Please provide your location, and I'll find the nearest fire station for you."})

    # Check if user provided a location
    if user_id in user_state and 'awaiting_location' in user_state[user_id]:
        # Assume the message is the location
        location = cleaned_message
        user_state[user_id]['location'] = location
        fire_station_info = get_nearest_fire_station(location)
        return jsonify({'response': fire_station_info})

    # Fuzzy matching for other responses
    matched_response = process.extractOne(cleaned_message, keywords.keys())
    if matched_response[1] >= 80:  # Match confidence threshold
        category = keywords[matched_response[0]]
        if category == "fire station inquiry":
            if user_id in user_state and 'location' in user_state[user_id]:
                location = user_state[user_id]['location']
                fire_station_info = get_nearest_fire_station(location)
                return jsonify({'response': fire_station_info})
            else:
                user_state[user_id] = {'awaiting_location': True}
                return jsonify({'response': "Please provide your location to find the nearest fire station."})
        elif category in responses:
            response = random.choice(responses[category])
            return jsonify({'response': response})

    # Default response if no matches found
    return jsonify({'response': "I'm sorry, I didn't understand that. Can you please clarify?"})

if __name__ == '__main__':
    app.run(debug=True)
