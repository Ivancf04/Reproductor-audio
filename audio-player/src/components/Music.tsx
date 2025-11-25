import IconButton from "./IconButton";
import "./css/Music.css"


const Music = () => {

    const songs = [
        "connected-science-electronica-283955.mp3",
        "magiksolo-beginning-investigation-232340.mp3", 
        "paper-planes-chill-future-beat-283956.mp3",
        "pulsewidth-science-electronica-283952.mp3",
        "swift-valkyrie-remastered-229741.mp3", 
        "thinking-time-148496.mp3",
        "thinking-time-ticking-power-223023.mp3", 
        "to-frighten-121407.mp3", 
        "tombola-284532.mp3", 
        "tutoriel-simple-237930.mp3"];

    const play = (song:string) => {
        alert("Reproduciendo: " + song);
    };

    const deleteMusic = (song:string) => {
        alert("Eliminando: " + song);
    };
  return (
    <main>
      {songs.map((song : string, index : number) => (
        <div key={index} className="music">
          <div className="music-info">
            <IconButton 
              iconUrl="../../public/img/Play.png" 
              onClick={() => play(song)} 
            />
            <h1 className="titulo-cancion">{song}</h1>
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