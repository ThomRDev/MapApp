import axios from "axios";

// https://docs.mapbox.com/playground/directions/
export const directionsApi = axios.create({
  baseURL:'https://api.mapbox.com/directions/v5/mapbox/driving',
  params:{
    access_token : 'pk.eyJ1IjoidGhvbXJvbWFuIiwiYSI6ImNsN2kxbGF4cTAzMHo0MW5zZXlhcHZtc2QifQ.G7deqrqIn6bhADb2GXJNKQ',
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    // rutas alternativas
    alternatives: false,
  }
})

// aqui estan todas las apis en modo playground
// https://docs.mapbox.com/playground/