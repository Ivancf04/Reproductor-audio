import IconButton from "./IconButton";
import styles from "./css/Music.module.css";
import type { Song } from "./ts/PlaylistStore";

type MusicProps = {
  songs: Song[];
  selectedSongIndex: number | null;
  isPlaying: boolean;
  onTogglePlayPause: (index: number) => void;
  onDelete: (index: number) => void;
};

const Music = ({
  songs,
  selectedSongIndex,
  isPlaying,
  onTogglePlayPause,
  onDelete,
}: MusicProps) => {
  return (
    <main className={styles.main}>
      {songs.map((song, index) => {
        const isActive = selectedSongIndex === index;
        const showPauseIcon = isActive && isPlaying;

        return (
          <div
            key={index}
            className={`${styles.music} ${isActive ? styles.active : ""}`}
          >
            <div className={styles.musicInfo}>
              <IconButton
                iconUrl={
                  showPauseIcon
                    ? "../../public/img/Pausa.png"
                    : "../../public/img/Play.png"
                }
                onClick={() => onTogglePlayPause(index)}
              />
              <h1
                className={`${styles.tituloCancion} ${
                  isActive ? styles.h1Active : ""
                }`}
              >
                {song.title}
              </h1>
            </div>
            <IconButton
              iconUrl="../../public/img/Basura.png"
              onClick={() => onDelete(index)}
            />
          </div>
        );
      })}
    </main>
  );
};

export default Music;
