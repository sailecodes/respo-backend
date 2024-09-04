import { useState } from "react";
import { FaSort } from "react-icons/fa";
import LibraryPlaylistsItem from "../components/LibraryPlaylistsItem";

const Library = () => {
  const [currentSort, setCurrentSort] = useState<string>("Recents");
  const [isSortWindowActive, setIsSortWindowActive] = useState<boolean>(false);

  return (
    <main className="library">
      <button className="library__sort" onClick={() => setIsSortWindowActive(!isSortWindowActive)}>
        <FaSort />
        <p>{currentSort}</p>
      </button>
      <div className="library__playlists">
        <LibraryPlaylistsItem id="dummy" name="Liked Songs" owner="Spotify, for you" />
        <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
        <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
        <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
        <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
      </div>
    </main>
  );
};

export default Library;
