import IconButton from "./IconButton";
import styles from "./css/Music.module.css";
import { usePlaylist } from "./ts/usePlaylist";
import type { Song } from "./ts/PlaylistStore";

const Music = () => {
  const { store, setSelectedTrack, removeTrack } = usePlaylist();
  const { songs, selectedSong } = store;

  const play = (song: Song) => {
    setSelectedTrack(song);
  };

  const deleteMusic = (song: Song) => {
    removeTrack(song);
  };

  return (
    <main className={styles.main}>
      {songs.map((song, index) => (
        <div
          key={index}
          className={`${styles.music} ${
            selectedSong?.path === song.path ? styles.active : ""
          }`}
        >
          <div className={styles.musicInfo}>
            <IconButton
              iconUrl="../../public/img/Play.png"
              onClick={() => play(song)}
            />
            <h1 className={styles.tituloCancion}>{song.title}</h1>
          </div>
          <IconButton
            iconUrl="../../public/img/Basura.png"
            onClick={() => deleteMusic(song)}
          />
        </div>
      ))}
    </main>
  );
};

export default Music;
