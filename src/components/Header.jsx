import React, { useContext, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export default function Header({
  onSearch,
  onlyNowPlaying,
  onOnlyNowPlayingChange,
}) {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-900 text-white gap-2">
      <form
        onSubmit={handleSearch}
        className="flex w-full md:w-2/3 gap-2 items-center"
      >
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Buscar
        </button>

        {/* Checkbox "Em Cartaz" */}
        <label className="flex items-center gap-2 text-sm ml-2">
          <input
            type="checkbox"
            checked={onlyNowPlaying}
            onChange={(e) => onOnlyNowPlayingChange(e.target.checked)}
          />
          Em Cartaz
        </label>
      </form>

      <div className="flex items-center gap-2">
        <label htmlFor="language-select">Idioma:</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-gray-800 border border-gray-700 p-2 rounded"
        >
          <option value="pt-BR">Português</option>
          <option value="en-US">English</option>
        </select>
      </div>
    </div>
  );
}
