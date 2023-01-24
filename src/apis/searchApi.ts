import axios from "axios";

// https://docs.mapbox.com/playground/geocoding/
// para buscar lugares
export const searchApi = axios.create({
  baseURL:'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params:{
    limit : 5,
    language : 'es',
    access_token : 'pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNsN2kxbGF4cTAzMHo0MW5zZXlhcHZtc2QifQ.G7deqrqIn6bhADb2GXJNKQ'
  }
})
// aqui estan todas las apis en modo playground
// https://docs.mapbox.com/playground/