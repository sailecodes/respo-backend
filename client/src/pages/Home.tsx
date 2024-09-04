import HomeTopPlaylists from "../components/HomeTopPlaylists";
import HomeTopSongs from "../components/HomeTopSongs";
import HomeRecentlyPlayed from "../components/HomeRecentlyPlayed";
import HomePopularPlaylists from "../components/HomePopularPlaylists";

const Home = () => {
  return (
    <main className="home">
      <HomeTopPlaylists />
      <HomeTopSongs />
      <HomeRecentlyPlayed />
      <HomePopularPlaylists />
    </main>
  );
};

export default Home;
