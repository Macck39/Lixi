import React, { useEffect, useState } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];

const MapAutocompleteInput = ({
  label,
  name,
  value,
  placeholder,
  submitted,
  onPlaceChange,
  selectedOption,
}) => {
  const [isDisabled, setIsDisabled] = useState(false); // Separate disabled state
  const [inputValue, setInputValue] = useState("");
  const [searchBox, setSearchBox] = useState(null);

  const handlePlacesChanged = (google) => {
 
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const selectedPlace = places[0];
        const location = selectedPlace.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        const label = selectedPlace.formatted_address;
        setInputValue(label);
        onPlaceChange(name, { label, lat, lng });
      }
   
  };
  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchBoxLoad = (ref) => {
    // console.log(ref);
    setSearchBox(ref);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    libraries,
  });
  useEffect(() => {
    // Update the disabled state based on the selectedOption
    setIsDisabled(selectedOption === "pickup" || selectedOption === "drop");
  }, [selectedOption]);
  useEffect(() => {
    if (submitted) {
      setInputValue("");
    }
  }, [submitted]);



  return (
    <div className="form-group">
      {isLoaded ? (
        <StandaloneSearchBox
          onLoad={handleSearchBoxLoad}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            name={name}
            id={name}
            className="p-2 w-full rounded-lg outline-none border-2 border-gray-300"
            placeholder={placeholder}
            value={value || inputValue}
            disabled={isDisabled}
            onChange={handleInputValueChange}
            autoComplete={isDisabled ? "off" : "on"}
          />
        </StandaloneSearchBox>
      ) : (
        <input
          type="text"
          name={name}
          id={name}
          className="p-2 w-full rounded-lg outline-none border-2 border-gray-300"
          placeholder={placeholder}
          value={value || inputValue}
          disabled={isDisabled}
          onChange={handleInputValueChange}
          autoComplete={isDisabled ? "off" : "on"}
        />
      )}
    </div>
  );
};

export default MapAutocompleteInput;
