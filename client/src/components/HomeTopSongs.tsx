import HomeBigItem from "./HomeBigItem";

const HomeTopSongs = () => {
  return (
    <section className="home-top-songs">
      <header>Your addictions</header>
      <div>
        <HomeBigItem id="dummy" titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem id="dummy" titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem id="dummy" titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem id="dummy" titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem id="dummy" titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem id="dummy" titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
      </div>
    </section>
  );
};

export default HomeTopSongs;
