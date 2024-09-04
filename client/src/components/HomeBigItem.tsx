import { Link } from "react-router-dom";

interface HomeBigItemProps {
  id?: string;
  titleOrName: string;
  ownerOrArtist: string;
  isSongItem: boolean;
}

const HomeBigItem = ({ id, titleOrName, ownerOrArtist, isSongItem }: HomeBigItemProps) => {
  return (
    <>
      {isSongItem && (
        <div>
          <div className="home-big-item__dummy-img" />
          <div className="home-big-item__song-info">
            <p>{titleOrName}</p>
            <p>{ownerOrArtist}</p>
          </div>
        </div>
      )}
      {!isSongItem && (
        <Link to={`/dashboard/playlist/${id}`} className="home-big-item">
          {/* <img src="" alt="" /> */}
          <div className="home-big-item__dummy-img" />
          <div className="home-big-item__song-info">
            <p>{titleOrName}</p>
            <p>{ownerOrArtist}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default HomeBigItem;
