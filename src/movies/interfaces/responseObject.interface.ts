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