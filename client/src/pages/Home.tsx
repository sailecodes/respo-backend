import HomeTopPlaylists from "../components/HomeTopPlaylists";

/*

Top playlists based on playcount
Top songs based on playcount
Recently played

*/
const Home = () => {
  return (
    <section className="home">
      <HomeTopPlaylists />
      <section className="home__top-songs"></section>
      <section className="home__recently-played"></section>
    </section>
  );
};

export default Home;
