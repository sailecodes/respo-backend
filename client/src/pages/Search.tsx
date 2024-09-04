import { useState } from "react";
import SearchGenresItem from "../components/SearchGenresItem";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <main className="search">
      <input
        type="text"
        placeholder="What do you want to listen to?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        <header>Genres galore</header>
        <div className="search__genres">
          <SearchGenresItem genre="K-pop" />
          <SearchGenresItem genre="R&B" />
          <SearchGenresItem genre="Pop" />
          <SearchGenresItem genre="Gospel" />
          <SearchGenresItem genre="Dance/Electronic" />
          <SearchGenresItem genre="Love" />
        </div>
      </div>
    </main>
  );
};

export default Search;
