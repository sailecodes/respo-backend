import HomeTopPlaylists from "../components/HomeTopPlaylists";
import HomeTopSongs from "../components/HomeTopSongs";
import HomeRecentlyPlayed from "../components/HomeRecentlyPlayed";
import HomePopularPlaylists from "../components/HomePopularPlaylists";

const Home = () => {
  return (
    <section className="home">
      <HomeTopPlaylists />
      <HomeTopSongs />
      <HomeRecentlyPlayed />
      <HomePopularPlaylists />
    </section>
  );
};

export default Home;
