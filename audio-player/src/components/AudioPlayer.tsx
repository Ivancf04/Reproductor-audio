import styles from "./css/AudioPlayer.module.css";
import IconButton from "./IconButton";
import { useAudioPlayer } from "./AudioPayerLogic";
import { usePlaylist } from "./ts/usePlaylist";

const AudioPlayer = () => {
  const { store } = usePlaylist();
  const { selectedSong } = store;

  const {
    audioRef,
    title,
    currentTimeText,
    currentTime,
    volume,
    isMuted,
    playPauseIcon,
    volumeIcon,
    duration,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleMute,
    handleTimeUpdate,
    handleProgressChange,
    handleVolumeChange,
    handleSeekEnd,
    onEnded,
  } = useAudioPlayer(selectedSong ? selectedSong.path : "");

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.audioTitle}>{title}</div>

      <div className={styles.audioContainer}>
        <div className={styles.audioControls}>
          <IconButton
            iconUrl="../../public/img/ant.png"
            onClick={handlePrevious}
          />
          <IconButton
            iconUrl={playPauseIcon}
            onClick={handlePlayPause}
            className={styles.playPauseBtn}
          />
          <IconButton iconUrl="../../public/img/sig.png" onClick={handleNext} />
        </div>

        <div className={styles.progressContainer}>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            className={styles.progressBar}
            step={0.01}
            onChange={handleProgressChange}
            onPointerUp={handleSeekEnd}
            style={{
              cursor: "pointer",
              background: `linear-gradient(to right,
              #ff853d 0%,
              #ff853d ${progress}%,
              #1e1e1e ${progress}%,
              #1e1e1e 100%
            )`,
            }}
          />
          <div className={styles.timeDisplay}>{currentTimeText}</div>

          <IconButton iconUrl={volumeIcon} onClick={handleMute} />

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            className={styles.progressBarVolume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={
          selectedSong ? `../../public/songs/${selectedSong.path}` : undefined
        }
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={onEnded}
        className={styles.audioElement}
      />
    </div>
  );
};

export default AudioPlayer;
