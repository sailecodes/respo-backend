import HomeBigItem from "./HomeBigItem";

const HomePopularPlaylists = () => {
  return (
    <section className="home-popular-playlists">
      <header>Potential bangers</header>
      <div>
        <HomeBigItem titleOrName="Playlist" ownerOrArtist="User" />
        <HomeBigItem titleOrName="Playlist" ownerOrArtist="User" />
        <HomeBigItem titleOrName="Playlist" ownerOrArtist="User" />
        <HomeBigItem titleOrName="Playlist" ownerOrArtist="User" />
        <HomeBigItem titleOrName="Playlist" ownerOrArtist="User" />
        <HomeBigItem titleOrName="Playlist" ownerOrArtist="User" />
      </div>
    </section>
  );
};

export default HomePopularPlaylists;
