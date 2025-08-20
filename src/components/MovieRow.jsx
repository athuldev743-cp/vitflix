/*import React, { useEffect, useState } from "react";
import { fetchMovies, fetchMovieTrailer } from "../api";
import "./MovieRow.css";

function MovieRow({ title, endpoint }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies(endpoint); // fetch posters & titles
        const moviesWithTrailers = await Promise.all(
          moviesData.map(async (movie) => {
            const trailerUrl = await fetchMovieTrailer(movie.id);
            return { ...movie, trailerUrl };
          })
        );
        setMovies(moviesWithTrailers);
      } catch (error) {
        console.error("Error loading movies:", error);
        setMovies([]); // fallback to empty array
      }
    };

    loadMovies();
  }, [endpoint]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector("video");
              if (video) video.play();
            }}
            onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector("video");
              if (video) video.pause();
            }}
          >
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            {movie.trailerUrl && (
              <video
                className="movie-video"
                src={movie.trailerUrl}
                muted
                loop
                preload="metadata"
                style={{ display: "none" }} // hide video by default
                onMouseEnter={(e) => (e.currentTarget.style.display = "block")}
                onMouseLeave={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;*/
import React, { useEffect, useState } from "react";
import { fetchMovies, fetchMovieTrailer } from "../api";
import "./MovieRow.css";

function MovieRow({ title, endpoint }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null); // track which movie is hovered

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies(endpoint);
        const moviesWithTrailers = await Promise.all(
          moviesData.map(async (movie) => {
            const trailerUrl = await fetchMovieTrailer(movie.id);
            return { ...movie, trailerUrl };
          })
        );
        setMovies(moviesWithTrailers);
      } catch (error) {
        console.error("Error loading movies:", error);
        setMovies([]);
      }
    };

    loadMovies();
  }, [endpoint]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onMouseEnter={() => setHoveredMovieId(movie.id)}
            onMouseLeave={() => setHoveredMovieId(null)}
          >
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />

           {hoveredMovieId === movie.id && movie.trailerUrl && (
  <div className="trailer-popup">
    <iframe
      className="trailer-video"
      src={`${movie.trailerUrl}?autoplay=1&mute=1&loop=1&playlist=${movie.trailerUrl.split("/").pop()}`}
      title={movie.title || movie.name}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;



