import path from "path";
import fs from "fs";
import Link from "next/link";

export default function GenresPage({ genres }) {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
        🎭 Movie Genres
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <li
            key={genre.id}
            className="bg-white p-4 rounded-lg shadow hover:bg-green-50 transition"
          >
            <Link
              href={`/genres/${genre.id}`}
              className="text-lg font-semibold text-green-700 hover:underline"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "data", "movies.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return {
    props: {
      genres: data.genres,
    },
  };
}
