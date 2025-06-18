import React, { useEffect, useContext, useState } from "react";
import MovieCard from "../components/MovieCard";
import api from "../services/api";
import { LanguageContext } from "../contexts/LanguageContext";
import Header from "../components/Header";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyNowPlaying, setOnlyNowPlaying] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        let response;

        if (onlyNowPlaying) {
          response = await api.get("/movie/now_playing", {
            params: { language, page: 1 },
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_MDB_API_KEY}`,
            },
          });

          const filmes = response.data.results;

          const filtrados = searchTerm
            ? filmes.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : filmes;

          setMovies(filtrados);
        } else {
          response = await api.get("/search/movie", {
            params: { language, query: searchTerm, page: 1 },
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_MDB_API_KEY}`,
            },
          });

          setMovies(response.data.results);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (onlyNowPlaying || searchTerm) {
      fetchData();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [language, searchTerm, onlyNowPlaying]);

  return (
    <div className="bg-black min-h-screen min-w-full text-white">
      <Header
        onSearch={setSearchTerm}
        onlyNowPlaying={onlyNowPlaying}
        onOnlyNowPlayingChange={setOnlyNowPlaying}
      />

      <h1 className="text-3xl px-6 py-4 mb-4">
        {searchTerm
          ? `Resultados para "${searchTerm}"`
          : onlyNowPlaying
          ? "Filmes em Cartaz"
          : "Todos os Filmes"}
      </h1>
      {searchTerm && (
        <div className="px-6 mb-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow transition duration-200"
            onClick={() => {
              setSearchTerm("");
              setOnlyNowPlaying(true); // opcional: voltar a marcar "Em Cartaz"
            }}
          >
            Limpar Busca
          </button>
        </div>
      )}

      {loading ? (
        <p className="px-6">Carregando...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-6 pb-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="px-6">Nenhum filme encontrado.</p>
      )}
    </div>
  );
}
