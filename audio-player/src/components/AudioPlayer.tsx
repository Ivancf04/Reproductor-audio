import "./css/AudioPlayer.css";
import { useState, useRef, useEffect } from "react";

type AudioPlayerProps = {
    url: string;
    title?: string;
}

const AudioPlayer = ({url, title = "This is my song title"}: AudioPlayerProps) => {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnd = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnd);

        return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnd);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
        audio.pause();
        } else {
        audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * duration;
    };

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return '00:00';
        
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="audio-player">
            <div className="audio-title">{title}</div>
            
            <div className="audio-container">
                <div className="audio-controls">
                <button className="play-pause-btn" onClick={togglePlayPause}>
                    {isPlaying ? '❚❚' : '▶'}
                </button>
                </div>

                <div className="progress-container">
                <div className="progress-bar" onClick={handleProgressClick}>
                    <div 
                    className="progress" 
                    style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
                </div>
            </div>

            <audio 
                ref={audioRef} 
                src={`../../public/songs/${url}`}
                preload="metadata"
            />
        </div>
    )
}

export default AudioPlayer;