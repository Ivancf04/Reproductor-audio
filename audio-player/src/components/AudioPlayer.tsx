import "./css/AudioPlayer.css";
import IconButton from "./IconButton";
import { useAudioPlayer } from "./AudioPayerLogic";

type AudioPlayerProps = {
  url: string;
};

const AudioPlayer = ({ url }: AudioPlayerProps) => {
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
  } = useAudioPlayer(url);

  return (
    <div className="audio-player">
      <div className="audio-title">{title}</div>

      <div className="audio-container">
        <div className="audio-controls">
          <IconButton
            iconUrl="../../public/img/ant.png"
            onClick={handlePrevious}
          />
          <IconButton iconUrl={playPauseIcon} onClick={handlePlayPause} />
          <IconButton
            iconUrl="../../public/img/sig.png"
            onClick={handleNext}
          />
        </div>

        <div className="progress-container">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            className="progress-bar"
            step={0.01}
            onChange={handleProgressChange}
            onPointerUp={handleSeekEnd}
            style={{ cursor: "pointer" }}
          />
          <div className="time-display">{currentTimeText}</div>

          <IconButton iconUrl={volumeIcon} onClick={handleMute} />

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            className="progress-bar-volume"
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={`../../public/songs/${url}`}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={onEnded}
      />
    </div>
  );
};

export default AudioPlayer;
