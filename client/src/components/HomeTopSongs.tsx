import HomeBigItem from "./HomeBigItem";

const HomeTopSongs = () => {
  return (
    <section className="home-top-songs">
      <header>Your addictions</header>
      <div>
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" />
      </div>
    </section>
  );
};

export default HomeTopSongs;
