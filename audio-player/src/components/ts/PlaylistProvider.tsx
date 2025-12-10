import { useReducer } from "react";
import type { ReactNode } from "react";
import { PlaylistContext } from "./PlaylistContext";
import { initialPlaylistStore } from "./PlaylistStore";
import { playlistReducer } from "./PlaylistReducer";

type PlaylistProviderProps = {
  children: ReactNode;
};

export const PlaylistProvider = ({ children }: PlaylistProviderProps) => {
  const [state, dispatch] = useReducer(playlistReducer, initialPlaylistStore);

  return (
    <PlaylistContext.Provider value={[state, dispatch]}>
      {children}
    </PlaylistContext.Provider>
  );
};
