import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const DashboardPlayer = () => {
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);

  return (
    <section className="dashboard-player">
      {/* <img src="" alt="" /> */}
      <div className="dashboard-player__content">
        <div className="dummy-img" />
        <div className="dashboard-player__content-info">
          <p>Title</p>
          <p>Artist</p>
        </div>
        {isSongPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <div className="dummy-progress-bar" />
    </section>
  );
};

export default DashboardPlayer;
