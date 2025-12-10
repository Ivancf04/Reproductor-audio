export type Song = {
  path: string;
  title: string;
};

export type PlaylistStore = {
  songs: Song[];
  selectedSong: Song | null;
};

export const initialPlaylistStore: PlaylistStore = {
  songs: [
    {
      path: "connected-science-electronica-283955.mp3",
      title: "Connected Science",
    },
    {
      path: "magiksolo-beginning-investigation-232340.mp3",
      title: "Beginning Investigation",
    },
    {
      path: "paper-planes-chill-future-beat-283956.mp3",
      title: "Paper Planes",
    },
    {
      path: "pulsewidth-science-electronica-283952.mp3",
      title: "Pulsewidth",
    },
    {
      path: "swift-valkyrie-remastered-229741.mp3",
      title: "Swift Valkyrie",
    },
    {
      path: "thinking-time-148496.mp3",
      title: "Thinking Time",
    },
    {
      path: "thinking-time-ticking-power-223023.mp3",
      title: "Thinking Time – Ticking Power",
    },
    {
      path: "to-frighten-121407.mp3",
      title: "To Frighten",
    },
    {
      path: "tombola-284532.mp3",
      title: "Tombola",
    },
    {
      path: "tutoriel-simple-237930.mp3",
      title: "Tutoriel Simple",
    },
  ],
  selectedSong: null,
};

