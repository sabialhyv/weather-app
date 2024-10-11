import { useState } from 'react';
import Weather from './components/Weather'

function App() {
  const [backgroundImage, setBackgroundImage] = useState('url(src/assets/images/background/morning-sky.webp)');
  const [containerBgColor, setContainerBgColor] = useState('gold');

  return (
    <div className="container" style={{ backgroundImage: backgroundImage }}>
      <div className='weather-container' style={{ backgroundColor: containerBgColor }}>
        <Weather setBackgroundImage={setBackgroundImage} setContainerBgColor={setContainerBgColor} />
      </div>
    </div>
  )
}

export default App
