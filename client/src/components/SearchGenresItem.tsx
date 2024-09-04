const SearchGenresItem = ({ genre }: { genre: string }) => {
  return (
    <div className="search-genres-item">
      {/* <img src="" alt="" /> */}
      <p>{genre}</p>
    </div>
  );
};

export default SearchGenresItem;
