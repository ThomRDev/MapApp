import { BtnGoToMyLocation, MapView, ReactLogo, SearchBar } from "../components"

export const HomeScreen = () => {
  return (
    <div>
      <SearchBar />
      <MapView />
      <BtnGoToMyLocation />
      <ReactLogo />
    </div>
  )
}
