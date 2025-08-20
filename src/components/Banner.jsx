import React, { useEffect, useState } from "react";
import { fetchMovies, fetchMovieTrailer } from "../api";
import "./Banner.css";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [fade, setFade] = useState(true); // for fade effect
  const baseImgUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies("/trending/all/week");
      if (!moviesData || moviesData.length === 0) return;

      setMovies(moviesData);
      const trailer = await fetchMovieTrailer(moviesData[0].id);
      setTrailerUrl(trailer);
    };

    loadMovies();
  }, []);

  // Rotate movies every 10 seconds with fade
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(async () => {
      setFade(false); // start fade out
      setTimeout(async () => {
        const nextIndex = (currentIndex + 1) % movies.length;
        setCurrentIndex(nextIndex);

        const nextTrailer = await fetchMovieTrailer(movies[nextIndex].id);
        setTrailerUrl(nextTrailer);

        setFade(true); // fade in
      }, 500); // duration of fade out
    }, 100000);

    return () => clearInterval(interval);
  }, [currentIndex, movies]);

  if (movies.length === 0) return <div>Loading...</div>;

  const movie = movies[currentIndex];

  return (
    <header
      className={`banner ${fade ? "fade-in" : "fade-out"}`}
      style={{
        backgroundImage: `url(${baseImgUrl}${movie.backdrop_path})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {trailerUrl && (
        <iframe
          className="banner-video"
          src={`${trailerUrl}?autoplay=1&mute=1&loop=1&playlist=${trailerUrl.split("/").pop()}`}
          title="Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

      <div className="banner-content">
        <h1 className="banner-title">{movie.title || movie.name}</h1>
        <p className="banner-description">{movie.overview}</p>
        <div className="banner-buttons">
          <button className="banner-btn">Play</button>
          <button className="banner-btn">My List</button>
        </div>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
}

export default Banner;

