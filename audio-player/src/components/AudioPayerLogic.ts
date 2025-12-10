import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { usePlaylist } from "./ts/usePlaylist";

export const useAudioPlayer = (url: string) => {
  const { store, setSelectedTrack } = usePlaylist();
  const { songs, selectedSong } = store;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeText, setCurrentTimeText] = useState("0:00 / 0:00");
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const title =
    selectedSong?.title ?? (url ? url.replace(".mp3", "") : "Selecciona una canción");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted || volume === 0;
  }, [volume, isMuted]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setCurrentTimeText("0:00 / 0:00");
    setIsPlaying(false);
  }, [url]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !url) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (!selectedSong || songs.length === 0) return;
    const index = songs.findIndex((s) => s.path === selectedSong.path);
    const nextIndex = index === -1 ? 0 : (index + 1) % songs.length;
    setSelectedTrack(songs[nextIndex]);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    if (!selectedSong || songs.length === 0) return;
    const index = songs.findIndex((s) => s.path === selectedSong.path);
    const prevIndex =
      index === -1 ? 0 : (index - 1 + songs.length) % songs.length;
    setSelectedTrack(songs[prevIndex]);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const current = audio.currentTime;
    const dur = audio.duration || 0;

    if (!isSeeking) {
      setCurrentTime(current);
      setDuration(dur);
      setCurrentTimeText(`${formatTime(current)} / ${formatTime(dur)}`);
    }
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSeeking(true);
    const value = Number(e.target.value);
    setCurrentTime(value);
    const audio = audioRef.current;
    const dur = audio?.duration || duration;
    setCurrentTimeText(`${formatTime(value)} / ${formatTime(dur)}`);
  };

  const handleSeekEnd = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = currentTime;
    setIsSeeking(false);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  const playPauseIcon = isPlaying
    ? "../../public/img/Pausa.png"
    : "../../public/img/Play.png";

  const volumeIcon =
    isMuted || volume === 0
      ? "../../public/img/silencio.png"
      : "../../public/img/volumen.png";

  const onEnded = () => {
    handleNext();
    setIsPlaying(false);
  };

  return {
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
    onEnded,
  };
};
