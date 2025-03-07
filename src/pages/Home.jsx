import { useState } from "react";
import MovieCard from "../components/MovieCard";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    
  const movies = [
    {
      id: 1,
      title: "John Wick ",
      release_date: "21/2/2003",
      url: "https://www.google.com",
    },
    {
      id: 2,
      title: "Terminator",
      release_date: "21/2/2003",
      url: "https://www.google.com",
    },
    {
      id: 3,
      title: "The Matrix",
      release_date: "21/2/2003",
      url: "https://www.google.com",
    },
  ];
    
    
    const handleSearch = (e) => { 
        e.preventDefault()
        console.log(searchQuery)

        setSearchQuery("")
    }



  return (
      <div className="home">
          <form onSubmit={handleSearch} className="search-form">
              <input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Search for a movie" className="search-input" />
                <button type="submit" className="search-button">Search</button>
          </form>
              
              
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
