import { useCallback, useEffect, useMemo, useReducer } from "react"
import { searchApi } from "../../apis"
import { getUserLocation } from "../../helpers"
import { Feature, PlacesResponse } from "../../interfaces"
import { PlacesContext } from "./PlacesContext"
import { PlacesActionTypes, placesReducer } from "./PlacesReducer"

export interface PlacesState{
  isLoading:boolean,
  userLocation?:[number,number] | null,
  isLoadingPlaces: boolean,
  places?: Feature[] | null,
}

const INITIAL_STATE:PlacesState = {
  // seguira cargando hasta que el usuario acepte la notificacion
  // para ver sus coordernadas
  isLoading:true,
  userLocation : null,
  isLoadingPlaces: false,
  places: null,
}

interface PlacesProviderProps{
  // children ?: ReactNode
  children ?: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }:PlacesProviderProps) => {
  const [state,dispatch] = useReducer(placesReducer,INITIAL_STATE)
  useEffect(()=>{
    getUserLocation()
    .then(lnglat=>dispatch({ type:PlacesActionTypes.SET_USER_LOCATION,payload:lnglat }))
  },[])

  const searchPlacesByTerm = useCallback(async (query:string)=>{
    if(query.trim().length == 0){
      dispatch({ type:PlacesActionTypes.SET_PLACES,payload:null })
      return null
    }
    if(!state.userLocation) throw new Error('No hay ubicacion del usuario')
    
    dispatch({ type:PlacesActionTypes.SET_LOADING_PLACES })

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`,{
      params: {
        proximity : state.userLocation.join(',')
      }
    })

    dispatch({
      type:PlacesActionTypes.SET_PLACES,
      payload: resp.data.features
    })

    return resp.data.features

  },[state,dispatch])

  const value = useMemo(()=>({
    ...state,
    searchPlacesByTerm
  }),[searchPlacesByTerm,state])

  return (
    <PlacesContext.Provider value={value}>
      {
        children
      }
    </PlacesContext.Provider>
  )
}
