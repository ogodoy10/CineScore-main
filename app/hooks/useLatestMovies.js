import { useEffect, useState } from "react";
import { getLatestMovies } from "../services/movieService";

const useLatestMovies = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try {
        const response = await getLatestMovies(); // Função para buscar os filmes mais recentes
        setLatestMovies(response);
      } catch (error) {
        console.error("Erro ao buscar filmes mais recentes:", error);
        setError(error.message);
      }
    };

    fetchLatestMovies();
  }, []);

  return { latestMovies, error };
};

export default useLatestMovies;
