import Header from "./components/Header";
import "./App.css"

function App() {
  const handleClick = () => {
    alert("Icono clickeado 🎵");
  };

  return (
    <div id="contenedor-principal">
      <Header
        title="DASC UABCS - MP3 Player"
        iconUrl="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
        onIconClick={handleClick}
      />
    </div>
  );
}

export default App;
