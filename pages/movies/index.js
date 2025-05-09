import path from "path";
import fs from "fs";
import { useState } from "react";
import Link from "next/link";

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState("all");

  const filteredMovies =
    selectedGenre === "all"
      ? movies
      : movies.filter((movie) => movie.genreId === selectedGenre);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-12">
          🎥 All Movies
        </h1>

        <div className="mb-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <label
            htmlFor="genre-select"
            className="text-lg font-medium text-gray-700"
          >
            Filter by Genre:
          </label>
          <select
            id="genre-select"
            onChange={(e) => setSelectedGenre(e.target.value)}
            value={selectedGenre}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 ease-in-out"
          >
            <option value="all">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 p-6"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-green-800 mb-2">
                {movie.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{movie.description}</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>⭐ Rating:</strong> {movie.rating}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <strong>📅 Release Year:</strong> {movie.releaseYear}
              </p>
              <Link
                href={`/movies/${movie.id}`}
                className="inline-block text-green-600 hover:text-green-800 font-medium transition duration-300 ease-in-out"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "movies.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return {
    props: {
      movies: data.movies,
      genres: data.genres,
    },
    revalidate: 60,
  };
}
