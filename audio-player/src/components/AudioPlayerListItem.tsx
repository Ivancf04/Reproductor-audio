// AudioPlayerListItem.tsx
import styles from "./css/Music.module.css";
import IconButton from "./IconButton";

type AudioPlayerListItemProps = {
  children: React.ReactNode;
  onPlay: () => void;
  onDelete: () => void;
  isPlaying?: boolean;
};

const AudioPlayerListItem = ({
  children,
  onPlay,
  onDelete,
  isPlaying = false,
}: AudioPlayerListItemProps) => {
  return (
    <div className={styles.music}>
      <button className={styles.audioPlayerListItem} onClick={onPlay}>
        {isPlaying ? (
          <img src="../../public/img/Pausa.png" alt="Pause" />
        ) : (
          <img src="../../public/img/Play.png" alt="Play" />
        )}
      </button>
      {children}
      <IconButton
        iconUrl="../../public/img/Basura.png"
        onClick={onDelete}
      />
    </div>
  );
};

export default AudioPlayerListItem;
