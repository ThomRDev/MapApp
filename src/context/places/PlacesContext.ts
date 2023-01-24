import { createContext } from "react";
import { Feature } from "../../interfaces";

export interface PlacesContextProps {
  isLoading:boolean
  userLocation?:[number,number] | null
  isLoadingPlaces:boolean
  places ?: Feature[] | null

  searchPlacesByTerm : (query:string) => Promise<Feature[] | null>
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps)