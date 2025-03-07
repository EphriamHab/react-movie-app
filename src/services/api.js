
const API_KEY = "6805da0b479da7f29cd7d5dbf27eef08"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

export const getPopularMovies = async () => { 
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
}

export const searchMovies = async (query) => { 
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json()
    return data.results
}