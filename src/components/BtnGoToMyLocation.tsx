
// este componente servira para ir a mi ubicacion directamente si ya

import { useMap, usePlaces } from "../hooks"

// me he movido mucho
export const BtnGoToMyLocation = () => {

  const { userLocation } = usePlaces()
  const { isMapReady,map } = useMap()

  const onClick = () => {
    if(!userLocation) throw new Error("No hay ubicacion del usuario")
    if(!isMapReady) throw new Error("Map is not ready")
    map?.flyTo({
      zoom: 14,
      center:userLocation
    })
  }

  return (
    <button 
      className="btn btn-primary"
      style={{
        position: 'fixed',
        top:' 8px',
        right: '61px',
        zIndex:999
      }}
      onClick={onClick}
    >Mi ubicacion</button>
  )
}
