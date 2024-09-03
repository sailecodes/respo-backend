import { Link } from "react-router-dom";

interface HomeBigItemProps {
  id: string;
  titleOrName: string;
  ownerOrArtist: string;
  isSongItem: boolean;
}

const HomeBigItem = ({ id, titleOrName, ownerOrArtist, isSongItem }: HomeBigItemProps) => {
  return (
    <Link to={`/dashboard/${isSongItem ? "song" : "playlist"}/${id}`} className="home-big-item">
      {/* <img src="" alt="" /> */}
      <div className="home-big-item__dummy-img" />
      <div className="home-big-item__song-info">
        <p>{titleOrName}</p>
        <p>{ownerOrArtist}</p>
      </div>
    </Link>
  );
};
export default HomeBigItem;
