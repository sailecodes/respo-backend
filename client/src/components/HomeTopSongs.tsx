import HomeSongItem from "./HomeSongItem";

const HomeTopSongs = () => {
  return (
    <section className="home-top-songs">
      <header>Your top songs</header>
      <div>
        <HomeSongItem />
        <HomeSongItem />
        <HomeSongItem />
        <HomeSongItem />
      </div>
    </section>
  );
};

export default HomeTopSongs;
