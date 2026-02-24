import React, { useEffect, useRef } from 'react';
import './AutocompleteMap.css';

const AutocompleteMap = () => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const placePickerRef = useRef(null);

    useEffect(() => {
        const initMap = async () => {
            await customElements.whenDefined('gmp-map');

            const map = mapRef.current;
            const marker = markerRef.current;
            const placePicker = placePickerRef.current;

            if (!map || !marker || !placePicker || !window.google) return;

            const infowindow = new window.google.maps.InfoWindow();

            map.innerMap.setOptions({
                mapTypeControl: false
            });

            const handlePlaceChange = () => {
                const place = placePicker.value;

                if (!place || !place.location) {
                    window.alert(
                        "No details available for input: '" + (place ? place.name : '') + "'"
                    );
                    infowindow.close();
                    marker.position = null;
                    return;
                }

                if (place.viewport) {
                    map.innerMap.fitBounds(place.viewport);
                } else {
                    map.center = place.location;
                    map.zoom = 17;
                }

                marker.position = place.location;
                infowindow.setContent(
                    `<strong>${place.displayName}</strong><br>
           <span>${place.formattedAddress}</span>`
                );
                infowindow.open(map.innerMap, marker);
            };

            placePicker.addEventListener('gmpx-placechange', handlePlaceChange);

            return () => {
                placePicker.removeEventListener('gmpx-placechange', handlePlaceChange);
            };
        };

        initMap();
    }, []);

    return (
        <div className="autocomplete-map-container">
            <gmpx-api-loader
                key={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                solution-channel="GMP_GE_mapsandplacesautocomplete_v2"
            ></gmpx-api-loader>
            <gmp-map
                ref={mapRef}
                center="40.749933,-73.98633"
                zoom="13"
                map-id="DEMO_MAP_ID"
            >
                <div slot="control-block-start-inline-start" className="place-picker-container">
                    <gmpx-place-picker
                        ref={placePickerRef}
                        placeholder="Enter an address"
                    ></gmpx-place-picker>
                </div>
                <gmp-advanced-marker ref={markerRef}></gmp-advanced-marker>
            </gmp-map>
        </div>
    );
};

export default AutocompleteMap;
