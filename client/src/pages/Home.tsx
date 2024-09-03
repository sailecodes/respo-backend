import HomeTopPlaylists from "../components/HomeTopPlaylists";
import HomeTopSongs from "../components/HomeTopSongs";

/*

Top playlists based on playcount
Top songs based on playcount
Recently played

*/
const Home = () => {
  return (
    <section className="home">
      <HomeTopPlaylists />
      <HomeTopSongs />
      <section className="home__recently-played"></section>
    </section>
  );
};

export default Home;
