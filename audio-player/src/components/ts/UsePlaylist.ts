import { useContext } from "react";
import { PlaylistContext } from "./PlaylistContext";
import { PlaylistActionTypes } from "./PlaylistReducer";
import type { Song } from "./PlaylistStore";

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error("usePlaylist debe usarse dentro de PlaylistProvider");
  }

  const [store, dispatch] = context;

  const setPlaylist = (songs: Song[]) => {
    dispatch({ type: PlaylistActionTypes.SET_PLAYLIST, payload: songs });
  };

  const addTrack = (song: Song) => {
    dispatch({ type: PlaylistActionTypes.ADD_TRACK, payload: song });
  };

  const removeTrack = (song: Song) => {
    dispatch({ type: PlaylistActionTypes.REMOVE_TRACK, payload: song });
  };

  const clearPlaylist = () => {
    dispatch({ type: PlaylistActionTypes.CLEAR_PLAYLIST });
  };

  const setSelectedTrack = (song: Song | null) => {
    dispatch({ type: PlaylistActionTypes.SET_SELECTED_TRACK, payload: song });
  };

  return {
    store,
    setPlaylist,
    addTrack,
    removeTrack,
    clearPlaylist,
    setSelectedTrack,
  };
};
