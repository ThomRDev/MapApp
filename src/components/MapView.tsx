import mapboxgl from "mapbox-gl"
import { useLayoutEffect, useRef } from "react"
import { useMap, usePlaces } from "../hooks"
import { Loading } from "./"

export const MapView = () => {
  const { userLocation,isLoading } = usePlaces()
  const { setMap } = useMap()

  const mapDivRef = useRef<HTMLDivElement>(null)
  
  useLayoutEffect(()=>{
    if(!isLoading){
      // https://mappinggis.com/2018/10/funcionalidades-mapa-web-mapbox-gl-js/
      const map = new mapboxgl.Map({
        container: mapDivRef.current!, // container ID
        // tambien puedo crear mis temas personalizado
        // style: 'mapbox://styles/mapbox/streets-v11', // style URL
        // style: 'mapbox://styles/mapbox/light-v10', // style URL
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        // style: 'mapbox://styles/mapbox/satellite-streets-v11',
        center: userLocation!, // starting position [lng, lat]
        zoom: 14, // starting zoom
      } as any)

      map.addControl(new mapboxgl.NavigationControl({
        showCompass:false,
      }))
      map.addControl(new mapboxgl.FullscreenControl());
      setMap(map)
    }
  },[isLoading])

  if(isLoading){
    return <Loading />
  }


  return (
    <div ref={mapDivRef}
      style={{
        // backgroundColor:'white',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        inset: '0'
      }}
    />
  )
}
