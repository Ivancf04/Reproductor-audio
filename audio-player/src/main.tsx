import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlaylistProvider } from "./components/ts/PlaylistProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </React.StrictMode>
);
