import { useRouter } from "next/router";
import path from "path";
import fs from "fs";

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-green-800 drop-shadow-sm mb-2">
            🎬 Movie House
          </h1>
          <p className="text-gray-600 text-lg">
            Explore trending movies handpicked for you
          </p>
        </header>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            🔥 Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-green-700">
                  {movie.title}
                </h3>
                <p className="text-gray-500 mt-1">
                  📅 Release Year: <strong>{movie.releaseYear}</strong>
                </p>
                <p className="text-yellow-600 mt-1">
                  ⭐ Rating: <strong>{movie.rating}</strong>
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/genres")}
            className="inline-block bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-8 py-3 rounded-full transition duration-300"
          >
            Browse Genres
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "movies.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const trendingMovies = data.movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return {
    props: { trendingMovies },
    revalidate: 60,
  };
}
