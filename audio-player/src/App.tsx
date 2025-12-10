import Header from "./components/Header";
import Music from "./components/Music";
import AudioPlayer from "./components/AudioPlayer";
import styles from "./App.module.css";
import { PlaylistProvider } from "./components/ts/PlaylistProvider";

function App() {
  const handleClick = () => {
    alert("Subiendo cancion");
  };

  return (
    <PlaylistProvider>
      <div className={styles.contenedorPrincipal}>
        <Header
          title="DASC UABCS - MP3 Player"
          iconUrl="../../public/img/mas.png"
          onIconClick={handleClick}
        />
        <br />
        <Music />
        <footer className={styles.footer}>
          <AudioPlayer />
        </footer>
      </div>
    </PlaylistProvider>
  );
}

export default App;
