import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MovieRow from "./components/MovieRow";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />

      <MovieRow title="Trending Now" endpoint="/trending/all/week" />
      <MovieRow title="viflix Originals" endpoint="/discover/tv?with_networks=213" />
      <MovieRow title="Top Rated" endpoint="/movie/top_rated" />
      <MovieRow title="Action Movies" endpoint="/discover/movie?with_genres=28" />
      <MovieRow title="Comedy Movies" endpoint="/discover/movie?with_genres=35" />
      <MovieRow title="Horror Movies" endpoint="/discover/movie?with_genres=27" />
      <MovieRow title="Romance Movies" endpoint="/discover/movie?with_genres=10749" />
      <MovieRow title="Documentaries" endpoint="/discover/movie?with_genres=99" />
    </div>
  );
}

export default App;

