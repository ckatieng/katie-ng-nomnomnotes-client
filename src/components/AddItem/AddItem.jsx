import axios from 'axios';
import { useEffect, useState } from "react";
import { fetchGoogleApiKey } from "../../utils/googlePlacesService";

function AddItem() {
  const [inputValue, setInputValue] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [apiKey, setApiKey] = useState(null);
  const [locationData, setLocationData] = useState(null);

  // Fetch the Google API key when the component mounts
  useEffect(() => {
    fetchGoogleApiKey().then((key) => {
      setApiKey(key);
    });
  }, []);

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;

    setInputValue(newInputValue);

    // Fetch predictions when the input changes
    fetchPredictions(newInputValue);
  };

      // Fetch the user's location details
      useEffect(() => {
         // Location URL
        const locationURL = "http://localhost:5050/api/users/location";

        axios.get(locationURL)
            .then((response) => {
                const { formattedAddress, latitude, longitude } = response.data;
                setLocationData({ formattedAddress, latitude, longitude });
            })
            .catch((err) => {
                console.error(`Error fetching location details: ${err}`);
            });
    }, []);

  const fetchPredictions = (input) => {
    if (apiKey) {
      const service = new window.google.maps.places.AutocompleteService();
      // Specify types to filter predictions (restaurant, cafe, bakery)
      const types = ['restaurant', 'cafe', 'bakery'];
      service.getPlacePredictions({ input, types }, (results) => {
        // Handle predictions here
        setPredictions(results || []);
      });
    }
  };



  return (
    <div className="add-item">
      <input
        type="text"
        placeholder="Search for a location"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div>
        {predictions.map((prediction) => (
          <div key={prediction.place_id}>{prediction.description}</div>
        ))}
      </div>
    </div>
  );
}

export default AddItem;