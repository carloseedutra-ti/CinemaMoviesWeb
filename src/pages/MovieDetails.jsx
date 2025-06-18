import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { LanguageContext } from "../contexts/LanguageContext";

export default function MovieDetails() {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const [movie, setMovie] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: { language },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MDB_API_KEY}`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await api.get(`/movie/${id}/videos`, {
          params: { language },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MDB_API_KEY}`,
          },
        });
        const trailer = response.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setVideoUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } catch (error) {
        console.error("Erro ao buscar trailer:", error);
      }
    };

    fetchMovie();
    fetchTrailer();
  }, [id, language]);

  if (!movie) return <p className="text-white px-6 py-4">Carregando...</p>;

  return (
    <div className="bg-black text-white min-h-screen px-6 py-6">
      {/* Título e botão */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          ← Voltar
        </Link>
      </div>

      {/* Backdrop */}
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="Backdrop"
          className="w-full max-h-[400px] object-cover rounded-lg mb-6"
        />
      )}

      {/* Conteúdo principal com texto e poster lado a lado */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Informações à esquerda */}
        <div className="flex-1">
          {movie.tagline && (
            <p className="italic mb-2 text-lg">{movie.tagline}</p>
          )}
          <p className="mb-4">
            <strong>Sinopse: </strong>
            {movie.overview}
          </p>
          <p>
            <strong>Gêneros:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Duração:</strong> {movie.runtime} min
          </p>
          <p>
            <strong>Lançamento:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Nota:</strong> {movie.vote_average} / 10 ({movie.vote_count}{" "}
            votos)
          </p>
        </div>

        {/* Poster à direita */}
        {movie.poster_path && (
          <div className="w-full md:w-64 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Trailer */}
      {videoUrl && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-96"
              src={videoUrl}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
