import type { PlaylistStore, Song } from "./PlaylistStore";

export const PlaylistActionTypes = {
  SET_PLAYLIST: "SET_PLAYLIST",
  ADD_TRACK: "ADD_TRACK",
  REMOVE_TRACK: "REMOVE_TRACK",
  CLEAR_PLAYLIST: "CLEAR_PLAYLIST",
  SET_SELECTED_TRACK: "SET_SELECTED_TRACK",
} as const;

export type PlaylistActionType =
  (typeof PlaylistActionTypes)[keyof typeof PlaylistActionTypes];

export type SetPlaylistAction = {
  type: typeof PlaylistActionTypes.SET_PLAYLIST;
  payload: Song[];
};

export type AddTrackAction = {
  type: typeof PlaylistActionTypes.ADD_TRACK;
  payload: Song;
};

export type RemoveTrackAction = {
  type: typeof PlaylistActionTypes.REMOVE_TRACK;
  payload: number;
};

export type ClearPlaylistAction = {
  type: typeof PlaylistActionTypes.CLEAR_PLAYLIST;
};

export type SetSelectedTrackAction = {
  type: typeof PlaylistActionTypes.SET_SELECTED_TRACK;
  payload: number | null;
};

export type PlaylistAction =
  | SetPlaylistAction
  | AddTrackAction
  | RemoveTrackAction
  | ClearPlaylistAction
  | SetSelectedTrackAction;

export const playlistReducer = (
  state: PlaylistStore,
  action: PlaylistAction
): PlaylistStore => {
  switch (action.type) {
    case PlaylistActionTypes.SET_PLAYLIST:
      return { ...state, songs: action.payload };

    case PlaylistActionTypes.ADD_TRACK:
      return { ...state, songs: [...state.songs, action.payload] };

    case PlaylistActionTypes.REMOVE_TRACK: {
      const indexToRemove = action.payload;
      const newSongs = state.songs.filter((_, i) => i !== indexToRemove);

      let newSelectedIndex = state.selectedSongIndex;

      if (newSongs.length === 0) {
        newSelectedIndex = null;
      } else if (newSelectedIndex !== null) {
        if (indexToRemove === newSelectedIndex) {
          newSelectedIndex =
            indexToRemove >= newSongs.length ? newSongs.length - 1 : indexToRemove;
        } else if (indexToRemove < newSelectedIndex) {
          newSelectedIndex = newSelectedIndex - 1;
        }
      }

      return {
        ...state,
        songs: newSongs,
        selectedSongIndex: newSelectedIndex,
      };
    }

    case PlaylistActionTypes.CLEAR_PLAYLIST:
      return { ...state, songs: [], selectedSongIndex: null };

    case PlaylistActionTypes.SET_SELECTED_TRACK:
      return { ...state, selectedSongIndex: action.payload };

    default:
      return state;
  }
};
