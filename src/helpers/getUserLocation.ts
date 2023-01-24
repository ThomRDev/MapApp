export const getUserLocation = async ():Promise<[number,number]> => {
  return new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition((geo)=>{
      const { coords:{ longitude,latitude } } = geo
      resolve([longitude,latitude])
    },err=>{
      alert('No se pudo obtener la geolocalization')
      console.log(err)
      reject()
    })
  })
}