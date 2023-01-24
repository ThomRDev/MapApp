import { ChangeEvent, useRef } from "react"
import { usePlaces } from "../hooks"
import { SearchResults } from "./"

export const SearchBar = () => {
  
  const debounceRef = useRef<NodeJS.Timeout>()
  const { searchPlacesByTerm,places,isLoadingPlaces } = usePlaces()

  const onQueryChanged = (event:ChangeEvent<HTMLInputElement>) => {
    if(debounceRef.current){
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(()=>{
      searchPlacesByTerm(event.target.value)
    },1000)
  }

  return (
    <div className="search-container">
      <input 
        type="text" 
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={onQueryChanged}
      />
      { !Array.isArray(places) && !isLoadingPlaces ? <></> : <SearchResults /> }
    </div>
  )
}
