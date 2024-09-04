import { useState } from "react";
import { FaSort } from "react-icons/fa";
import LibraryPlaylistsItem from "../components/LibraryPlaylistsItem";

interface LibrarySortPopupOptionProps {
  sortOption: string;
  currSort: string;
  setCurrSort: React.Dispatch<React.SetStateAction<string>>;
}

const LibrarySortPopupOption = ({ sortOption, currSort, setCurrSort }: LibrarySortPopupOptionProps) => {
  return (
    <p
      className={`library-sort-popup-option ${currSort === sortOption ? "active" : ""}`}
      onClick={() => setCurrSort(sortOption)}>
      {sortOption}
    </p>
  );
};

const Library = () => {
  const [currSort, setCurrSort] = useState<string>("Recents");
  const [isSortWindowActive, setIsSortWindowActive] = useState<boolean>(false);

  return (
    <>
      <main className="library">
        <button className="library__sort" onClick={() => setIsSortWindowActive(!isSortWindowActive)}>
          <FaSort />
          <p>{currSort}</p>
        </button>
        <div className="library__playlists">
          <LibraryPlaylistsItem id="dummy" name="Liked Songs" owner="Spotify, for you" />
          <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
          <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
          <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
          <LibraryPlaylistsItem id="dummy" name="Playlist" owner="Unknown" />
        </div>
      </main>
      <div className={`library__sort-popup ${isSortWindowActive ? "active" : ""}`}>
        <div>
          <header>Sort by</header>
          <div>
            <LibrarySortPopupOption sortOption="Recents" currSort={currSort} setCurrSort={setCurrSort} />
            <LibrarySortPopupOption sortOption="Recently added" currSort={currSort} setCurrSort={setCurrSort} />
            <LibrarySortPopupOption sortOption="Alphabetical" currSort={currSort} setCurrSort={setCurrSort} />
            <LibrarySortPopupOption sortOption="Creator" currSort={currSort} setCurrSort={setCurrSort} />
          </div>
          <button onClick={() => setIsSortWindowActive(false)}>Back</button>
        </div>
      </div>
    </>
  );
};

export default Library;
