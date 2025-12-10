import styles from "./css/AudioPlayer.module.css";
import IconButton from "./IconButton";
import type React from "react";

type AudioPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  title: string;
  currentTimeText: string;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playPauseIcon: string;
  volumeIcon: string;
  handlePlayPause: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleMute: () => void;
  handleTimeUpdate: () => void;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeekEnd: () => void;
  handleOnPlay: () => void;
  handleOnPause: () => void;
  onEnded: () => void;
  selectedSongPath: string | null;
};

const AudioPlayer = ({
  audioRef,
  title,
  currentTimeText,
  currentTime,
  duration,
  volume,
  isMuted,
  playPauseIcon,
  volumeIcon,
  handlePlayPause,
  handleNext,
  handlePrevious,
  handleMute,
  handleTimeUpdate,
  handleProgressChange,
  handleVolumeChange,
  handleSeekEnd,
  handleOnPlay,
  handleOnPause,
  onEnded,
  selectedSongPath,
}: AudioPlayerProps) => {
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
          selectedSongPath
            ? `../../public/songs/${selectedSongPath}`
            : undefined
        }
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={onEnded}
        onPlay={handleOnPlay}
        onPause={handleOnPause}
        className={styles.audioElement}
      />
    </div>
  );
};

export default AudioPlayer;
