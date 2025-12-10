import { useReducer } from "react";
import { PlaylistContext } from "./PlaylistContext";
import { playlistReducer } from "./PlaylistReducer";
import { initialPlaylistStore } from "./PlaylistStore";
import type { ReactNode } from "react";

type PlaylistProviderProps = {
  children: ReactNode;
};

export const PlaylistProvider = ({ children }: PlaylistProviderProps) => {
  const [store, dispatch] = useReducer(playlistReducer, initialPlaylistStore);

  return (
    <PlaylistContext.Provider value={[store, dispatch]}>
      {children}
    </PlaylistContext.Provider>
  );
};
