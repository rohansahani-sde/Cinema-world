import React, { useEffect, useState } from "react";
import {API_KEY} from '../utils/constant'

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMovies = async (pageNum) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageNum}`);
      const data = await res.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]); // Append new results
    } catch (error) {
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);



  return (
    <div className="mt-16 pt-4 bg-black text-white">
      <h1 className="text-center text-2xl"><span className="text-red-700 animate-pulse">Trending </span> 
        Movies & Shows</h1>
      <div className="grid grid-cols-5 gap-5 m-6">
        {movies.map((movie) => (
          <div key={movie.id} className="p-4 border-b border-t rounded-3xl">
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title || movie.name} />
            <p>{movie.title || movie.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setPage(page + 1)} className="mt-4 p-2 bg-blue-500 text-white ">
        Load More
      </button>
    </div>
  );
};

export default TrendingMovies;
