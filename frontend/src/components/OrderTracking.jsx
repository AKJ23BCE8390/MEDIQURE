import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

const socket = io(
    "http://localhost:3000"
);

function RecenterMap({
    latitude,
    longitude
}) {
    const map = useMap();

    useEffect(() => {
        map.setView(
            [latitude, longitude],
            map.getZoom()
        );
    }, [
        latitude,
        longitude,
        map
    ]);

    return null;
}

export default function OrderTracking() {
    const { orderId } =
        useParams();

    const [location, setLocation] =
        useState({
            latitude: 26.9124,
            longitude: 75.7873
        });

    useEffect(() => {
        if (!orderId) return;

        socket.emit(
            "join-order-room",
            orderId
        );

        socket.on(
            "location-update",
            data => {
                setLocation({
                    latitude:
                        data.latitude,
                    longitude:
                        data.longitude
                });
            }
        );

        return () => {
            socket.off(
                "location-update"
            );
        };
    }, [orderId]);

    return (
        <div
            style={{
                padding: "20px"
            }}
        >
            <h2>
                Live Delivery Tracking
            </h2>

            <p>
                Order ID:
                {" "}
                {orderId}
            </p>

            <MapContainer
                center={[
                    location.latitude,
                    location.longitude
                ]}
                zoom={15}
                style={{
                    height:
                        "500px",
                    width:
                        "100%",
                    borderRadius:
                        "12px"
                }}
            >
                <RecenterMap
                    latitude={
                        location.latitude
                    }
                    longitude={
                        location.longitude
                    }
                />

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[
                        location.latitude,
                        location.longitude
                    ]}
                >
                    <Popup>
                        🚚 Delivery Boy
                        <br />
                        Lat:
                        {" "}
                        {
                            location.latitude
                        }
                        <br />
                        Lng:
                        {" "}
                        {
                            location.longitude
                        }
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}