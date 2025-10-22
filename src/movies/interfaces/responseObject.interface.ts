export interface IMoviesResponse{
    docs: [],
    total: number,
    limit: number,
    page: number,
    pages: number,
}

export interface IMovieInterface{
    id: string,
    name: string,
    url: string
}

export interface IMovie{
    id: number,
    name: string,
    description: string,
    rating: number,
    movieLength: number,
    ageRating: number,
    genres: string[],
    poster: string,
    createdAt: string,
    updatedAt: string
}