import Header from "./components/Header";
import Music from "./components/music";
import AudioPlayer from "./components/AudioPlayer";
import "./App.css"

function App() {
  const handleClick = () => {
    alert("Icono clickeado 🎵");
  };

  return (
    <div id="contenedor-principal">
      
      <Header
        title="DASC UABCS - MP3 Player"
        iconUrl="../../public/img/mas.png"
        onIconClick={handleClick}
      />
      <br />
      <Music/>
      <footer>
        <AudioPlayer
        url="connected-science-electronica-283955.mp3"
        />
      </footer>
    </div>
  );
}

export default App;
