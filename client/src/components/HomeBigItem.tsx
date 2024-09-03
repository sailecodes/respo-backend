const HomeBigItem = ({ titleOrName, ownerOrArtist }: { titleOrName: string; ownerOrArtist: string }) => {
  return (
    <div className="home-big-item">
      {/* <img src="" alt="" /> */}
      <div className="home-big-item__dummy-img" />
      <div className="home-big-item__song-info">
        <p>{titleOrName}</p>
        <p>{ownerOrArtist}</p>
      </div>
    </div>
  );
};
export default HomeBigItem;
