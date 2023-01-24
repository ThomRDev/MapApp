import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl"
import { useCallback, useEffect, useMemo, useReducer } from "react"
import { directionsApi } from "../../apis"
import { usePlaces } from "../../hooks"
import { DirectionsResponse } from "../../interfaces/directions"
import { MapContext } from "./MapContext"
import { MapActions, mapReducer } from "./MapReducer"

export interface MapProviderProps {
  children?:JSX.Element | JSX.Element[]
}

export interface MapState{
  isMapReady:boolean,
  map?:Map | null,
  markers:Marker[]
}

const INITIAL_STATE:MapState = {
  isMapReady:false,
  map:null,
  markers:[]
}

export const MapProvider = ({ children }:MapProviderProps) => {

  const [state,dispatch] = useReducer(mapReducer,INITIAL_STATE)
  const { userLocation } = usePlaces()

  const { places } = usePlaces()

  // si places tiene datos, crear los marcadores
  useEffect(()=>{
    state.markers.forEach( marker => marker.remove() );
    if(!Array.isArray(places) || places.length == 0){
      dispatch({ type: MapActions.SET_MAKERS, payload: [] });
      if ( state.map?.getLayer('RouteString') ) {
        state.map.removeLayer('RouteString');
        state.map.removeSource('RouteString');
      }
      state.map?.flyTo({
        zoom: 14,
        center:userLocation!
      })
      return;
    }
    const newMarkers:Marker[] = []
    for (const place of places) {
      const [ lng,lat ] = place.center
      const popup = new Popup()
      .setHTML(`
      <h4>${place.text_es}</h4>
      <p>${place.place_name_es}</p>
      `)
      const newMarker = new Marker()
      .setPopup(popup)
      .setLngLat([ lng,lat ])
      .addTo(state.map!)
      newMarkers.push(newMarker)
    }
    
    dispatch({ type: MapActions.SET_MAKERS, payload: newMarkers });
  },[places,state.map])

  const setMap = useCallback((map:Map)=>{

    const myLocationPopup = new Popup()
    .setHTML(`
      <h4>Aqui estoy</h4>
      <p>En algún lugar del mundo</p>
    `)

    new Marker({
      color: '#61DAFB'
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map)

    dispatch({ type:MapActions.SET_MAP, payload:map })
  },[])

  const getRouteBetweenPoints = useCallback(async (start: [number, number], end: [number, number])=>{
    const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
    // la distancia por defecto esta en metros
    // y la diracion esta en segundos
    const { distance, duration, geometry } = resp.data.routes[0];
    // aqui nos dan todas las coordenadas para ir de start a end
    const { coordinates: coords } = geometry;

    // kilometros
    // convirtiendo de metros a kilometros
    // 1000m == 1hm
    let kms = distance / 1000
    // redondeando y moviendo el punto decimal dos posiciones
    // tambien puedo usar .toFixed(2) y convertirlo a numbero
    // kms = Math.round(kms * 100)
    // kms = kms / 100
    kms = Number(kms.toFixed(2))

    // convirtiendo de segundos a minutos
    // 60s = 1m
    const minutes = Math.floor(duration/60)
    console.log({ kms, minutes });

    // POSICIONANDO LOS DOS PUNTOS AL CENTRO DEL  MAPA
    // bounds = limites, para que el mapa se posicione en ese contenedor
    // y se puedan ver los puntos los cuales se generan las rutas
    const bounds = new LngLatBounds(
      // que contengan estos puntos
      start,
      start
    )
    for (const coord of coords ) {
      const newCoord: [number, number] = [ coord[0], coord[1] ];
      bounds.extend( newCoord );
    }
    state.map?.fitBounds( bounds, {
      // para que los dos puntos no esten en los extremos
        padding: 200
    });

    // CREANDO LA RUTA (POLYLINE)
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
          type: 'FeatureCollection',
          features: [
              {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                      type: 'LineString',
                      coordinates: coords
                  }
              }
          ]
      }
    }

    // si existe un layer, borrar
    if ( state.map?.getLayer('RouteString') ) {
        state.map.removeLayer('RouteString');
        state.map.removeSource('RouteString');
    }

    // agregando la polyline al mapa
    state.map?.addSource('RouteString', sourceData );

    // poniendo estilos a mi polyline
    state.map?.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },
        paint: {
            // 'line-color': 'black',
            'line-color': '#C8DEFE',
            // 'line-color': 'white',
            'line-width': 3
        }
    })

  },[state.map])

  const value = useMemo(()=>({
    ...state,
    setMap,
    getRouteBetweenPoints
  }),[state])


  return (
    <MapContext.Provider value={value}>
      {
        children
      }
    </MapContext.Provider>
  )
}
