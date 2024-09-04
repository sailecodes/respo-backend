import { FaEllipsisH } from "react-icons/fa";

const PlaylistSongsItem = ({ title, artist }: { title: string; artist: string }) => {
  return (
    <div className="playlist-songs-item">
      {/* <img src="" alt="" /> */}
      <div className="playlist-songs-item__dummy-img" />
      <div className="playlist-songs-item__description">
        <p>{title}</p>
        <p>{artist}</p>
      </div>
      <FaEllipsisH />
    </div>
  );
};

export default PlaylistSongsItem;
