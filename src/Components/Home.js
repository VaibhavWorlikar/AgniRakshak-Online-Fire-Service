import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Home = () => {
    const [location, setLocation] = useState({ lat: null, lng: null });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => console.error(error)
        );
    }, []);

    const handleEmergencyClick = () => {
        if (location.lat && location.lng) {
            alert(`Emergency! Location detected: Latitude ${location.lat}, Longitude ${location.lng}`);
            // You can add more functionality here, such as sending this location to an emergency service
        } else {
            alert('Location not detected. Please try again.');
        }
    };

    return (
        <div id='home' style={styles.container}>
            {/* Map Section */}
            <div style={styles.mapContainer}>
                {location.lat && location.lng ? (
                    <LoadScript googleMapsApiKey="AIzaSyASrVaUmdj5WbIczcb9w0neJeDVevM02Tg">
                        <GoogleMap
                            mapContainerStyle={styles.map}
                            center={location}
                            zoom={15}
                        >
                            <Marker position={location} />
                        </GoogleMap>
                    </LoadScript>
                ) : (
                    <p>Loading map...</p>
                )}
            </div>

            {/* Information Section */}
            <div style={styles.infoContainer}>
                <h1>Agni Rakshak</h1>
                <p>Your trusted partner in fire safety.</p>
                <Button onClick={handleEmergencyClick} style={styles.emergencyButton}>
                    Emergency
                </Button>
            </div>

            {/* Chatbot Section */}
            <div style={styles.chatbot}>
                <div style={styles.chatbotIcon}>💬</div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f8f9fa',
    },
    mapContainer: {
        flex: 0.4,  // 40% width
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '70%',
        height: '70%',
    },
    infoContainer: {
        flex: 0.6,  // 60% width
        padding: '40px',
        backgroundColor: '#fe6434',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
    },
    emergencyButton: {
        marginTop: '20px',
        padding: '15px 30px',
        fontSize: '18px',
        backgroundColor: 'red',
        border: 'none',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    chatbot: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    chatbotIcon: {
        fontSize: '24px',
    },
};

export default Home;
