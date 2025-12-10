import Header from "./components/Header";
import Music from "./components/Music";
import AudioPlayer from "./components/AudioPlayer";
import styles from "./App.module.css";
import { usePlaylist } from "./components/ts/usePlaylist";
import { useAudioPlayer } from "./components/AudioPayerLogic";

function App() {
  const handleClick = () => {
    alert("Subiendo cancion");
  };

  const { store, setSelectedTrack, removeTrack } = usePlaylist();
  const { songs, selectedSongIndex } = store;

  const selectedSong =
    selectedSongIndex !== null ? songs[selectedSongIndex] : null;

  const audio = useAudioPlayer(selectedSong ? selectedSong.path : "");

  const handleToggleFromList = (index: number) => {
    if (selectedSongIndex === index) {
      audio.handlePlayPause();
    } else {
      setSelectedTrack(index);
    }
  };

  const handleDeleteFromList = (index: number) => {
    removeTrack(index);
  };

  return (
    <div className={styles.contenedorPrincipal}>
      <Header
        title="DASC UABCS - MP3 Player"
        iconUrl="../../public/img/mas.png"
        onIconClick={handleClick}
      />

      <br />

      <Music
        songs={songs}
        selectedSongIndex={selectedSongIndex}
        isPlaying={audio.isPlaying}
        onTogglePlayPause={handleToggleFromList}
        onDelete={handleDeleteFromList}
      />

      <footer className={styles.footer}>
        <AudioPlayer
          audioRef={audio.audioRef}
          title={selectedSong ? selectedSong.title : "Selecciona una canción"}
          currentTimeText={audio.currentTimeText}
          currentTime={audio.currentTime}
          duration={audio.duration}
          volume={audio.volume}
          isMuted={audio.isMuted}
          playPauseIcon={audio.playPauseIcon}
          volumeIcon={audio.volumeIcon}
          handlePlayPause={audio.handlePlayPause}
          handleNext={audio.handleNext}
          handlePrevious={audio.handlePrevious}
          handleMute={audio.handleMute}
          handleTimeUpdate={audio.handleTimeUpdate}
          handleProgressChange={audio.handleProgressChange}
          handleVolumeChange={audio.handleVolumeChange}
          handleSeekEnd={audio.handleSeekEnd}
          handleOnPlay={audio.handleOnPlay}
          handleOnPause={audio.handleOnPause}
          onEnded={audio.onEnded}
          selectedSongPath={selectedSong ? selectedSong.path : null}
        />
      </footer>
    </div>
  );
}

export default App;
