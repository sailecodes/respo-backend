const HomeSmallItem = ({ titleOrName }: { titleOrName: string }) => {
  return (
    <div className="home-small-item">
      {/* <img src="" alt="" /> */}
      <div className="home-small-item__dummy" />
      <p>{titleOrName.substring(0, 15) + "..."}</p>
    </div>
  );
};
export default HomeSmallItem;
