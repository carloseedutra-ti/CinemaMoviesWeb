import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative group cursor-pointer overflow-visible transition-transform duration-300 transform origin-center group-hover:z-20 max-w-full">
        <div className="overflow-hidden rounded-lg">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[480px] object-contain bg-black transition-transform duration-300 transform group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          <p className="text-xs line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </Link>
  );
}
