import Weather from './components/Weather'

function App() {

  const currentHour = new Date().getHours(); 
  const isDayTime = currentHour >= 6 && currentHour < 18;

  return (
    <div className={isDayTime ? "container" : "nighter-container"}>
      <Weather />
    </div>
  )
}

export default App
