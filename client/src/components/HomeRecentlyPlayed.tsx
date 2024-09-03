import HomeBigItem from "./HomeBigItem";

const HomeRecentlyPlayed = () => {
  return (
    <section className="home-recently-played">
      <header>Jump back in</header>
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

export default HomeRecentlyPlayed;
