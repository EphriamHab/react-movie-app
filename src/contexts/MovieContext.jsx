import { useState, createContext, useEffect, useContext } from "react";



const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [ratings, setRatings] = useState({});
    useEffect(() => {
        const storedRatings = localStorage.getItem("ratings");
        if (storedRatings) setRatings(JSON.parse(storedRatings));
    }, []);
    
    useEffect(() => {
        localStorage.setItem("ratings", JSON.stringify(ratings));
    }, [ratings]);
    
    const rateMovie = (movieId, rating) => {
        setRatings(prev => ({ ...prev, [movieId]: rating }));
    };
    
    const getRating = (movieId) => ratings[movieId] || 0;
    

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, []);
    
    
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        rateMovie,
        getRating
    }
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};