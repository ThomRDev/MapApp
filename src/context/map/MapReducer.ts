import { Map,Marker } from 'mapbox-gl'
import { MapState } from './MapProvider'

export enum MapActions {
  SET_MAP = "[map] setMap",
  SET_MAKERS = "[map] setMarkers"
}

type MapAction =
| { type : MapActions.SET_MAP,payload:Map }
| { type : MapActions.SET_MAKERS,payload:Marker[] }

export const mapReducer = (state:MapState,action:MapAction):MapState => {
  switch(action.type){
    case MapActions.SET_MAP:
      return {
        ...state,
        isMapReady:true,
        map:action.payload
      }
    case MapActions.SET_MAKERS:
      return {
        ...state,
        markers:action.payload
      }
    default:
      return state
  }
}