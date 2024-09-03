import HomeBigItem from "./HomeBigItem";

const HomePopularPlaylists = () => {
  return (
    <section className="home-popular-playlists">
      <header>Potential bangers</header>
      <div>
        <HomeBigItem id="dummy" titleOrName="Playlist" ownerOrArtist="User" isSongItem={false} />
        <HomeBigItem id="dummy" titleOrName="Playlist" ownerOrArtist="User" isSongItem={false} />
        <HomeBigItem id="dummy" titleOrName="Playlist" ownerOrArtist="User" isSongItem={false} />
        <HomeBigItem id="dummy" titleOrName="Playlist" ownerOrArtist="User" isSongItem={false} />
        <HomeBigItem id="dummy" titleOrName="Playlist" ownerOrArtist="User" isSongItem={false} />
        <HomeBigItem id="dummy" titleOrName="Playlist" ownerOrArtist="User" isSongItem={false} />
      </div>
    </section>
  );
};

export default HomePopularPlaylists;
