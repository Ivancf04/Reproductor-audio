import "./css/AudioPlayer.css";
import IconButton from "./IconButton";
import { useRef, useState, useEffect } from "react";

type AudioPlayerProps = {
    url: string;
}

const AudioPlayer = ({url}: AudioPlayerProps) => {
    const audioElement = useRef(null)
    const buttonElement = useRef(null)
    const buttonElementSig = useRef(null)
    const buttonElementAnt = useRef(null)
    const buttonElementVol = useRef(null)
    const tittleElement = useRef(null)

    const [currentTime, setCurrentTimeDisplay] = useState("0:00 / 0:00");
    const [progress, setProgress] = useState(0);

    if(tittleElement.current){
        const tittleName = tittleElement.current as HTMLDivElement;
        tittleName.textContent = url.replace(".mp3", "")
    }
    
    const handlePlayPause = () => {
        if (audioElement.current && buttonElement.current) {
            const audio = audioElement.current as HTMLAudioElement;
            const img = buttonElement.current as HTMLImageElement;
            if (audio.paused) {
            audio.play();
            img.src = "../../public/img/Pausa.png";
            } else {
            audio.pause();
            img.src = "../../public/img/Play.png";
            }
        }
    }

    const handleNext = () => {
        if (audioElement.current && buttonElementSig.current){
            const audio = audioElement.current as HTMLAudioElement;

            audio.currentTime += 10;
        }
    }

    
    const handlePrevious = () => {
        if (audioElement.current && buttonElementAnt.current){
            const audio = audioElement.current as HTMLAudioElement;
            audio.currentTime -= 10;
        }
    }

    const handleMute = () => {
        if (audioElement.current && buttonElementVol.current){
            const audio = audioElement.current as HTMLAudioElement;
            audio.muted = !audio.muted;
            const img = buttonElementVol.current as HTMLImageElement;
            img.src = audio.muted ? "../../public/img/silencio.png" : "../../public/img/volumen.png";
        }
    }

    useEffect(() => {
        if (audioElement.current) {
            const audio = audioElement.current as HTMLAudioElement;
        
        const updateTime = () => {
            if (audio) {
                const current = audio.currentTime;
                const duration = audio.duration || 0;

                if (duration > 0) {
                    const progressPercent = (current / duration) * 100;
                    setProgress(progressPercent);
                }
                
                const formatTime = (time: number) => {
                    const minutes = Math.floor(time / 60);
                    const seconds = Math.floor(time % 60);
                    return `${minutes}:${String(seconds).padStart(2, '0')}`;
                };
                
                setCurrentTimeDisplay(`${formatTime(current)} / ${formatTime(duration)}`);
            }
        };

        if (audio) {
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateTime);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateTime);
            }
        };
        }
    }, []);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioElement.current) {
            const audio = audioElement.current as HTMLAudioElement;
            const progressBar = e.currentTarget;
            const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const progressBarWidth = progressBar.clientWidth;
            const percentage = (clickPosition / progressBarWidth) * 100;
            
            if (audio.duration) {
                const newTime = (percentage / 100) * audio.duration;
                audio.currentTime = newTime;
                setProgress(percentage);
            }
        }
    };
    return (

        <div className="audio-player">
            <div ref={tittleElement} className="audio-title"></div>
            
            <div className="audio-container">
                <div className="audio-controls">
                    <IconButton
                        ref={buttonElementSig}
                        iconUrl="../../public/img/ant.png"
                        onClick={handlePrevious}
                    />
                    <IconButton
                        ref={buttonElement}
                        iconUrl="../../public/img/Play.png"
                        onClick={handlePlayPause}
                    />
                    <IconButton
                        ref={buttonElementAnt}
                        iconUrl="../../public/img/sig.png"
                        onClick={handleNext}
                    />
                </div>

                <div className="progress-container">
                <div 
                        className="progress-bar" 
                        onClick={handleProgressClick}
                        style={{ cursor: 'pointer' }}>
                    <div 
                    className="progress" 
                    style={{ width: `${progress}%` }}
                    />
                </div>
                <IconButton
                        ref={buttonElementVol}
                        iconUrl="../../public/img/volumen.png"
                        onClick={handleMute}
                />
                <div className="time-display">
                    {currentTime}
                </div>
                </div>
            </div>

            <audio 
                ref={audioElement}
                src={`../../public/songs/${url}`}
                preload="metadata"
            />
        </div>
    )
}

export default AudioPlayer;