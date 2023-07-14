import React from "react";
import Geocode from "react-geocode";
import { useState } from "react";
import { useEffect } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';
import useAuth from "../../hooks/useAuth";
import { isMobile } from "react-device-detect";
import { markLtLgProps, markersProps } from "../../types/mapsTypes";

const apiKey = "AIzaSyDJ1rioiNZvWxXStO3NId3oAk9DrSAn6jo";

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Map = () => {
  const google = window.google;
  const { user } = useAuth();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [markLtLg, setMarkLtLg] = useState<markLtLgProps | null>(null);
  const [markers, setMarkers] = useState<markersProps[]>([]);



  const onLoad = React.useCallback((map: google.maps.Map) => setMap(map), []);

  const onUnmount = React.useCallback((map: google.maps.Map) => setMap(null), []);

  useEffect(() => {
    if(user) {
      Geocode.fromAddress(user.cep, apiKey, "pt", "br")
        .then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setMarkLtLg({lat, lng});
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }, []);

  useEffect(() => {
    if(map && !!markLtLg) {
      var pyrmont = new google.maps.LatLng(markLtLg.lat,markLtLg.lng);
  
      const placeService = new google.maps.places.PlacesService(map);
      
      const placeRequest = {
        location: pyrmont,
        radius: 5,
        query: 'recycle center'
      }
    
      const placeCallback = (results, status) => {
        if (status === 'OK') {
          const markersToAdd = results.map(item => {
            return {
              id: item.place_id,
              position: {lat: item.geometry.location.lat(), lng: item.geometry.location.lng()},
              title: item.name
            }
          });
          setMarkers(markersToAdd);
        }
      }
      placeService.textSearch(placeRequest, placeCallback)
    }
  }, [map]);

  return !!markLtLg ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markLtLg}
      zoom={isMobile ? 14 : 16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((mark) => (
        <Marker key={mark.id} position={mark.position}  title={mark.title} />
      ))}      
    </GoogleMap>
  ) : (
    <div>Carregando o mapa...</div>
  )
}

export default Map;