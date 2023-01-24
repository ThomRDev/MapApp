
import reactSvg from './../assets/react.svg'

export const ReactLogo = () => {
  return (
    <img 
      src={reactSvg} 
      alt="React Logo" 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '130px'
      }}
    />
  )
}
