import { createContext } from "react";
import type { PlaylistStore } from "./PlaylistStore";
import { initialPlaylistStore } from "./PlaylistStore";
import type { PlaylistAction } from "./PlaylistReducer";

export type PlaylistContextType = [
  PlaylistStore,
  React.Dispatch<PlaylistAction>
];

export const PlaylistContext = createContext<PlaylistContextType>([
  initialPlaylistStore,
  () => undefined,
]);
