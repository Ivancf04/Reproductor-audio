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
  payload: Song;
};

export type ClearPlaylistAction = {
  type: typeof PlaylistActionTypes.CLEAR_PLAYLIST;
};

export type SetSelectedTrackAction = {
  type: typeof PlaylistActionTypes.SET_SELECTED_TRACK;
  payload: Song | null;
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
    case PlaylistActionTypes.REMOVE_TRACK:
      return {
        ...state,
        songs: state.songs.filter(
          (song) => song.path !== action.payload.path
        ),
      };
    case PlaylistActionTypes.CLEAR_PLAYLIST:
      return { ...state, songs: [], selectedSong: null };
    case PlaylistActionTypes.SET_SELECTED_TRACK:
      return { ...state, selectedSong: action.payload };
    default:
      return state;
  }
};
