# Problema de mapbox con typescript cuando se transpila para generar el build

```ts

// en todos los archivos donde utilicemos mapbox-gl => ! = significa que no transpilara

// de
import {blablalba} from "mapbox-gl"
// a
import {blablalba} from "!mapbox-gl"

// ahora ts pensara que es otro modulo que no esta instalado
// agregaremos arriba del import esto

//@ts-ignore 
import {blablalba} from "!mapbox-gl"

// ademas en todos los proyectos donde utilice mapbox en la primera linea
// colocar lo siguiente

/* eslint import/no-webpack-loader-syntax: off */
```

Estos errores suceden con Create React App y webpack
