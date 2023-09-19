import React from "react";
import Geocode from "react-geocode";
import { useState } from "react";
import { useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import useAuth from "../../hooks/useAuth";
import { isMobile } from "react-device-detect";
import { markLtLgProps, markersProps } from "../../types/mapsTypes";
import { Icon } from "@iconify/react";
import { getAllUsers } from "../../firebase";
import { userBasicProps } from "../../types/authTypes";

const apiKey = "AIzaSyDJ1rioiNZvWxXStO3NId3oAk9DrSAn6jo";

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapComponent = () => {
  const google = window.google;
  const { user, isLoading, setLoading } = useAuth();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [markLtLg, setMarkLtLg] = useState<markLtLgProps | null>(null);
  const [markers, setMarkers] = useState<markersProps[]>([]);
  const [feedback, setFeedback] = useState<string | null>();
  const [selectedElement, setSelectedElement] = useState<any>();
  const [users, setUsers] = useState<userBasicProps[]>([]);

  const onLoad = React.useCallback((map: google.maps.Map) => setMap(map), []);

  const onUnmount = React.useCallback((map: google.maps.Map) => setMap(null), []);

  useEffect(() => {
    setLoading(true);
    setFeedback('Carregando o mapa...');
    if(user) {
      Geocode.fromAddress(`${user.address},${user.city},${user.cep}`, apiKey, "pt", "br")
        .then(
          (response) => {
            setLoading(false);
            setFeedback(null);
            const { lat, lng } = response.results[0].geometry.location;
            setMarkLtLg({lat, lng});
          },
          (error) => {
            setLoading(false);
            setFeedback('Erro ao carregar o mapa. Tente mais tarde.');
            console.error(error);
          }
        )
    }
  }, []);

  useEffect(() => console.log(markers), [markers])

  useEffect(() => {
    if(map && !!markLtLg) {
      var pyrmont = new google.maps.LatLng(markLtLg.lat,markLtLg.lng);
  
      const placeService = new google.maps.places.PlacesService(map);

      let markersToAdd: any[] = [];

      if(!!users.length) {
        users
        .filter(item => item.accountType === 'pontoDeColeta')
        .forEach(async point => {
          await Geocode.fromAddress(`${point.address},${point.city},${point.cep}`, apiKey, "pt", "br")
            .then(
              (response) => {
                if(response.status === 'OK') {
                  response.results.forEach(pointToAdd => {
                    markersToAdd.push({
                        id: pointToAdd.place_id,
                        position: {lat: pointToAdd.geometry.location.lat, lng: pointToAdd.geometry.location.lng},
                        title: point.name,
                        address: pointToAdd.formatted_address,
                        telefone: point.telefone
                    })
                  })
                }
              },
              (error) => {
                console.error(error);
              }
            )
        })
      }
      
      const placeRequest = {
        location: pyrmont,
        radius: 5,
        query: 'recycle center'
      }
    
      const placeCallback = async (results, status) => {
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        const pinColor = new PinElement({
          background: '#712eff',
          scale: 1.2,
          borderColor: '#000',
          glyphColor: '#fff'
        });
        new AdvancedMarkerElement({
          map,
          position: markLtLg,
          content: pinColor.element,
          title: 'Your Location'
        });

        if (status === 'OK') {
          results.forEach(item => {
            markersToAdd.push({
              id: item.place_id,
              position: {lat: item.geometry.location.lat(), lng: item.geometry.location.lng()},
              title: item.name,
              address: item.formatted_address
            })
          });
        }

        setMarkers(markersToAdd);
      }
      placeService.textSearch(placeRequest, placeCallback);
      if(!users.length) {
        getAllUsers()
          .then(users => {
            setUsers(Object.values<userBasicProps>(users))
          })
      }
    }
  }, [map, users]);

  return !feedback ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markLtLg!}
      zoom={isMobile ? 14 : 16}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId: 'bb09906fa2e463e9'}}
    >
      {markers.map((mark) => (
        <Marker
          key={mark.id}
          position={mark.position} 
          title={mark.title}
          onClick={() => setSelectedElement(mark)}
        >
          {selectedElement && selectedElement.id === mark.id ? (
            <InfoWindow
              onCloseClick={() => {
                setSelectedElement(null);
              }}
            >
              <div style={{margin: '4px'}}>
                <h4>{selectedElement.title}</h4>
                <p>{selectedElement.address}</p>
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}

    </GoogleMap>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {isLoading && <Icon icon='svg-spinners:pulse-multiple' color="#712eff" width={96} height={96} />}
      <p style={{ color: "#712eff" }}>{feedback}</p>
    </div>
  )
}

export default MapComponent;