import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const UserLocation = (props) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState("");
    const [formVisible, setFormVisible] = useState(false);

    // Haversine formula to calculate distance
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (degree) => (degree * Math.PI) / 180;

        const R = 6371; // Radius of Earth in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in km
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setError(null);
                },
                () => {
                    setError("Unable to retrieve location. Please allow location access.");
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (location) {
            // Filter places within 3 km
            const nearbyPlaces = props.list.filter((place) =>
                haversineDistance(location.lat, location.lng, place.lat, place.lng) < 3
            );
            setFilteredPlaces(nearbyPlaces);
            setFormVisible(nearbyPlaces.length > 0); // Show form if there are nearby places
        }
    }, [location, props.list]);

    return (
        <>
            <div style={{ marginTop: '3rem', textAlign: 'center' }}><h2>Community Forum</h2></div>
            <div className='modal' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className='map-container' style={{ width: '800px', height: '500px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px', backgroundColor: '#fff' }}>
                    {location ? (
                        <>
                            <APIProvider apiKey={"AIzaSyA3qGp5WMAfui-nI0kb2kzhKIIwcJ_oLxA"}>
                                <Map zoom={12} center={location}>
                                    <Marker position={location} title="Your Location" />

                                    {filteredPlaces.map((place, idx) => (
                                        <Marker key={idx} position={{ lat: place.lat, lng: place.lng }} title={place.name} />
                                    ))}
                                </Map>
                            </APIProvider>

                            {filteredPlaces.length > 0 && (
                                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                                    <h3>Select Construction Site</h3>
                                    <select
                                        value={selectedPlace}
                                        onChange={(e) => setSelectedPlace(e.target.value)}
                                        style={{
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            fontSize: '1rem',
                                            width: '80%'
                                        }}
                                    >
                                        <option value="">-- Select a Site --</option>
                                        {filteredPlaces.map((place, idx) => (
                                            <option key={idx} value={place.name}>
                                                {place.name}
                                            </option>
                                        ))}
                                    </select>

                                    {selectedPlace && (
                                        <p style={{ marginTop: '10px', fontSize: '1.1rem', color: '#333' }}>
                                            You selected: <strong>{selectedPlace}</strong>
                                        </p>
                                    )}
                                </div>
                            )}

                            {formVisible && (
                                <form style={{
                                    backgroundColor: "#f3f4f6",
                                    padding: "2rem",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                    maxWidth: "400px",
                                    margin: "2rem auto",
                                    textAlign: "center"
                                }}>
                                    <h3 style={{ color: "#333", marginBottom: "1rem" }}>Submit a Concern</h3>
                                    <select
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "0.8rem",
                                            border: "1px solid #ccc",
                                            borderRadius: "8px",
                                            fontSize: "1rem",
                                            marginBottom: "1rem"
                                        }}
                                    >
                                        <option value="" disabled selected>Select Category</option>
                                        <option value="noise">Noise Pollution</option>
                                        <option value="dust">Dust Issues</option>
                                        <option value="safety">Safety Concerns</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <textarea
                                        placeholder="Describe your concern..."
                                        required
                                        style={{
                                            width: "92%",
                                            padding: "0.8rem",
                                            border: "1px solid #ccc",
                                            borderRadius: "8px",
                                            fontSize: "1rem",
                                            resize: "none",
                                            height: "120px",
                                            marginBottom: "1rem"
                                        }}
                                    ></textarea>
                                    <button
                                        type="submit"
                                        style={{
                                            backgroundColor: "#4CAF50",
                                            color: "white",
                                            border: "none",
                                            padding: "0.8rem 1.5rem",
                                            borderRadius: "8px",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            transition: "0.3s"
                                        }}
                                    >
                                        Submit
                                    </button>
                                </form>
                            )}
                        </>
                    ) : (
                        <p style={{ textAlign: 'center', padding: '20px' }}>{error || "Fetching location..."}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserLocation;
