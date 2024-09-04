import HomeBigItem from "./HomeBigItem";

const HomeRecentlyPlayed = () => {
  return (
    <section className="home-recently-played">
      <header>Jump back in</header>
      <div>
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
        <HomeBigItem titleOrName="Song" ownerOrArtist="Artist" isSongItem={true} />
      </div>
    </section>
  );
};

export default HomeRecentlyPlayed;
