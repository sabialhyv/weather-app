import Weather from './components/Weather'

function App() {

  const currentHour = new Date().getHours(); // Şu anki saati al
  const isDayTime = currentHour >= 6 && currentHour < 18;
  console.log(currentHour)

  return (
    <>
      {/* <img src={sun} alt="" /> */}
      {/* <img src={rain} alt="" /> */}
      <div className={isDayTime ? "container" : "nighter-container"}>
        <Weather />
      </div>
      {/* <img src={cloud} alt="" /> */}
    </>


  )
}

export default App
