import React, { memo } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from 'react-simple-maps';
import './IndiaMap.css';

const geoUrl = "/india.topo.json";

const markers = [
    { markerOffset: 15, name: "Delhi", coordinates: [77.2090, 28.6139] },
    { markerOffset: 15, name: "Mumbai", coordinates: [72.8777, 19.0760] },
    { markerOffset: -15, name: "Bangalore", coordinates: [77.5946, 12.9716] },
    { markerOffset: 15, name: "Hyderabad", coordinates: [78.4867, 17.3850] },
    { markerOffset: 15, name: "Chennai", coordinates: [80.2707, 13.0827] },
    { markerOffset: -15, name: "Kolkata", coordinates: [88.3639, 22.5726] },
    { markerOffset: 15, name: "Pune", coordinates: [73.8567, 18.5204] },
    { markerOffset: -15, name: "Ahmedabad", coordinates: [72.5714, 23.0225] },
    { markerOffset: 15, name: "Jaipur", coordinates: [75.7873, 26.9124] },
    { markerOffset: 15, name: "Chandigarh", coordinates: [76.7794, 30.7333] }
];

const IndiaMap = () => {
    return (
        <div className="india-map-container fade-in-up">
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 1000,
                    center: [82.5, 23] // Center over India
                }}
                width={600}
                height={600}
                style={{ backgroundColor: "transparent" }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        (geographies || []).map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill="var(--glass-bg)"
                                stroke="var(--border-color)"
                                strokeWidth={1}
                                className="geography-path"
                                style={{
                                    default: { outline: "none" },
                                    hover: { outline: "none" },
                                    pressed: { outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>

                {markers.map(({ name, coordinates, markerOffset }) => (
                    <Marker key={name} coordinates={coordinates}>
                        <g className="city-marker">
                            <circle r={8} fill="var(--google-blue)" className="pulse-ring" />
                            <circle r={4} fill="var(--google-blue)" className="core-dot" />
                        </g>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};

export default memo(IndiaMap);
