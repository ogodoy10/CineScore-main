// services/movieService.js
import { fetchAPI } from "./apiClient"; 
import Movie from '../models/Movie';

// Helper para formatar a data de lançamento
const formatReleaseDate = (date) => {
  if (!date) return "Data desconhecida";
  const formattedDate = new Date(date);
  return !isNaN(formattedDate)
    ? formattedDate.toISOString().split("T")[0] // Formata para 'yyyy-MM-dd'
    : "Data desconhecida";
};

export const getAllMovies = async () => {
  const data = await fetchAPI('/movies');
  return data.map(movieData => ({
    ...new Movie(movieData),
    releaseDate: formatReleaseDate(movieData.releaseDate), // Formata a data
    primaryGenre: typeof movieData.primaryGenreName === 'string' ? movieData.primaryGenreName : '', // Garante que seja uma string
    otherGenres: movieData.otherGenreNames || [],   // Garante que otherGenres seja uma lista vazia se não existir
  }));
};

export const getMovieById = async (movieId) => {
  const data = await fetchAPI(`/movies/${movieId}`);
  return {
    ...new Movie(data),
    releaseDate: data.releaseDate || "",
    primaryGenre: data.primaryGenre || "",
    otherGenres: data.otherGenres || [],
  };
};


export const getTop10Movies = async () => {
  const data = await fetchAPI('/movies/top10');
  return data.map(movieData => ({
    id: movieData.id,
    name: movieData.name,
    imageUrl: movieData.imageUrl, // Corrige para imageUrl
    rating: movieData.rating,
    releaseDate: formatReleaseDate(movieData.releaseDate), // Formata a data
    primaryGenre: typeof movieData.primaryGenreName === 'string' ? movieData.primaryGenreName : 'Gênero Desconhecido',
    otherGenres: movieData.otherGenreNames || [],
    synopsis: movieData.synopsis || ''
  }));
};

export const getMoviesByGenre = async (genreId) => {
  const data = await fetchAPI(`/movies/genre/${genreId}?limit=20`);
  return data.map(movieData => ({
    id: movieData.id,
    name: movieData.name,
    imageUrl: movieData.imageUrl,
    rating: movieData.rating,
    releaseDate: formatReleaseDate(movieData.releaseDate), // Formata a data
    primaryGenre: typeof movieData.primaryGenreName === 'string' ? movieData.primaryGenreName : 'Gênero Desconhecido',
    otherGenres: movieData.otherGenres || [], // Corrige para incluir os gêneros
    synopsis: movieData.synopsis || ''
  }));
};

export const getLatestMovies = async () => {
  const data = await fetchAPI('/movies/latest');
  return data.map(movieData => ({
    ...new Movie(movieData),
    releaseDate: formatReleaseDate(movieData.releaseDate), // Formata a data
    primaryGenre: typeof movieData.primaryGenreName === 'string' ? movieData.primaryGenreName : '', // Garante que seja uma string
    otherGenres: movieData.otherGenreNames || [],   // Garante que otherGenres seja uma lista vazia se não existir
  }));
};

// Função para buscar filmes pelo nome
export const searchMoviesByName = async (query) => {
  const data = await fetchAPI(`/movies/search?query=${query}`);
  return data.map(movieData => ({
    id: movieData.id,
    name: movieData.name,
    imageUrl: movieData.imageUrl,
    rating: movieData.rating,
    releaseDate: formatReleaseDate(movieData.releaseDate), // Formata a data
    primaryGenre: typeof movieData.primaryGenreName === 'string' ? movieData.primaryGenreName : 'Gênero Desconhecido',
    otherGenres: movieData.otherGenreNames || [], // Adiciona os gêneros secundários
    synopsis: movieData.synopsis || ''       // Adiciona a sinopse
  }));
};

export const deleteMovie = async (movieId) => {
  const response = await fetchAPI(`/movies/${movieId}`, {
    method: "DELETE",
  });

  // Processa a resposta JSON
  if (!response.ok) {
    throw new Error("Erro ao deletar o filme");
  }
  return response.json();
};

export const addMovie = async (movie) => {
  try {
      const response = await fetchAPI("/movies", {
          method: "POST",
          body: JSON.stringify(movie),
      });
      return response; // Retorna os dados do filme adicionado
  } catch (error) {
      console.error("Erro ao adicionar o filme:", error.message);
      throw error;
  }
};



