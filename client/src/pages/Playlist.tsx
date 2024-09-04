import { FaPlayCircle, FaPlusCircle } from "react-icons/fa";
import PlaylistSongsItem from "../components/PlaylistSongsItem";
import { useNavigate } from "react-router-dom";

const Playlist = ({ owner = "Unknown" }: { owner: string }) => {
  const navigate = useNavigate();

  return (
    <main className="playlist">
      <div>
        <button className="playlist__back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        {/* <img src="" alt="" /> */}
        <div className="playlist__img-dummy" />
      </div>
      <div className="playlist__description">
        <p>Zedd, ILLENIUM, Lost Frequencies and more</p>
        <p>
          Made by <span>{owner}</span>
        </p>
        <p>2h 55m</p>
      </div>
      <nav className="playlist__nav">
        <FaPlayCircle />
        <FaPlusCircle />
      </nav>
      <div className="playlist__songs">
        <PlaylistSongsItem title="Fractures" artist="ILLENIUM, Nevve" />
        <PlaylistSongsItem title="Fractures" artist="ILLENIUM, Nevve" />
      </div>
    </main>
  );
};

export default Playlist;
