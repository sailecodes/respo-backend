import { Link } from "react-router-dom";

const HomeSmallItem = ({ id, title }: { id: string; title: string }) => {
  return (
    <Link to={`/dashboard/playlist/${id}`} className="home-small-item">
      {/* <img src="" alt="" /> */}
      <div className="home-small-item__dummy" />
      <p>{title.substring(0, 15) + "..."}</p>
    </Link>
  );
};
export default HomeSmallItem;
