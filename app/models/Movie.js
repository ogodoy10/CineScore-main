class Movie {
  constructor({ id, name, synopsis, releaseDate, director, actors, rating, imageUrl, primaryGenre, otherGenres, comments = [] }) {
    this.id = id;
    this.name = name;
    this.synopsis = synopsis;
    this.releaseDate = releaseDate;
    this.director = director; // Por enquanto, assume-se que é uma string, mas futuramente pode ser substituído por um objeto Director.
    this.actors = actors; // Inicialmente uma lista de strings, mas no futuro pode ser uma lista de objetos Actor.
    this.rating = rating;
    this.imageUrl = imageUrl;
    this.primaryGenre = primaryGenre; // ID do gênero principal.
    this.otherGenres = otherGenres;   // Lista de IDs de outros gêneros.
    this.comments = comments; // Array para armazenar comentários associados ao filme.
  }
}

export default Movie;