"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { TaxiTrip } from "@/types/trips";
import { formateDateTime } from "@/utils/format-date";

const pickupIcon = new L.Icon({
  iconUrl: "./icons/location.ico",
  iconSize: [32, 32],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28],
  shadowUrl: "./icons/location-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [16, 41],
});

const dropoffIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9567/9567040.png",
  iconSize: [32, 32],
});

const RoutingMachine = ({ trip }: { trip: TaxiTrip | null }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (map && trip) {
      const {
        pickup_latitude,
        pickup_longitude,
        dropoff_latitude,
        dropoff_longitude,
      } = trip;

      // cek koordinat
      if (
        pickup_latitude === undefined ||
        pickup_longitude === undefined ||
        dropoff_latitude === undefined ||
        dropoff_longitude === undefined ||
        isNaN(Number(pickup_latitude)) ||
        isNaN(Number(pickup_longitude)) ||
        isNaN(Number(dropoff_latitude)) ||
        isNaN(Number(dropoff_longitude))
      ) {
        console.error("Koordinat tidak valid!", trip);
        alert("Koordinat tidak valid. Harap cek data");
        return;
      }

      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(Number(pickup_latitude), Number(pickup_longitude)),
          L.latLng(Number(dropoff_latitude), Number(dropoff_longitude)),
        ],
        routeWhileDragging: true,
        router: L.Routing.osrmv1({
          serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1",
        }),
      });

      routingControl.addTo(map);
      routingControlRef.current = routingControl;

      return () => {
        if (routingControlRef.current && map) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      };
    }
  }, [map, trip]);

  return null;
};

const Map = ({ selectedTrip }: { selectedTrip: TaxiTrip | null }) => {
  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Menampilkan RoutingMachine hanya jika ada trip terpilih */}
      <RoutingMachine trip={selectedTrip} />

      {selectedTrip && (
        <>
          <Marker
            position={[
              Number(selectedTrip.pickup_latitude),
              Number(selectedTrip.pickup_longitude),
            ]}
            icon={pickupIcon}
          >
            <Popup>
              <b>Time:</b> {formateDateTime(selectedTrip.pickup_datetime)}
            </Popup>
          </Marker>

          <Marker
            position={[
              Number(selectedTrip.dropoff_latitude),
              Number(selectedTrip.dropoff_longitude),
            ]}
            icon={dropoffIcon}
          >
            <Popup>
              <b>Fare:</b> ${selectedTrip.fare_amount}
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default Map;
