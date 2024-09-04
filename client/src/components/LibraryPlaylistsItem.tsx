import { Link } from "react-router-dom";

const LibraryPlaylistsItem = ({ id, name, owner }: { id: string; name: string; owner: string }) => {
  return (
    <Link to={`/dashboard/playlist/${id}`} className="library-playlists-item">
      {/* <img src="" alt="" /> */}
      <div className="library-playlists-item__dummy-img" />
      <div className="library-playlists-item__information">
        <p>{name}</p>
        <p>{owner}</p>
      </div>
    </Link>
  );
};

export default LibraryPlaylistsItem;
