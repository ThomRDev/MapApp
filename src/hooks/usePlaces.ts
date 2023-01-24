import { useContext } from "react"
import { PlacesContext } from "../context"

export const usePlaces = () => {
  return useContext(PlacesContext)
}
