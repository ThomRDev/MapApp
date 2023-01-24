import { Feature } from "../../interfaces";
import { PlacesState } from "./PlacesProvider";

export enum PlacesActionTypes {
  SET_USER_LOCATION = "[places] setUserLocation",
  SET_LOADING_PLACES = "[places] setLoadingPlaces",
  SET_PLACES = "[places] setPlaces",
}

type PlacesAction = 
| { type : PlacesActionTypes.SET_USER_LOCATION, payload : [number,number] }
| { type : PlacesActionTypes.SET_LOADING_PLACES }
| { type : PlacesActionTypes.SET_PLACES,payload:Feature[] | null }

export const placesReducer = (state:PlacesState,action:PlacesAction):PlacesState => {
  switch(action.type){
    case PlacesActionTypes.SET_USER_LOCATION:
      return {
        ...state,
        isLoading:false,
        userLocation: action.payload
      }
    case PlacesActionTypes.SET_LOADING_PLACES:
      return {
        ...state,
        isLoadingPlaces:true,
        places:[],
      }
    case PlacesActionTypes.SET_PLACES:
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      }
    default:
      return state
  }
}