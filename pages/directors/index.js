import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR("/api/directors", fetcher);

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load directors.
      </p>
    );
  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎬 Directors</h1>

        {data.directors.map((director) => (
          <div key={director.id} className="mb-6 border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {director.name}
            </h2>
            <p className="text-gray-600 mt-2">{director.biography}</p>

            <h4 className="text-lg font-medium mt-4 text-black">
              Movies Directed:
            </h4>
            <ul className="list-disc pl-5 mt-2">
              {data.movies
                .filter((movie) => movie.directorId === director.id)
                .map((movie) => (
                  <li key={movie.id} className="mt-2">
                    <Link
                      href={`/movies/${movie.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {movie.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
