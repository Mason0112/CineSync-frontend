import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';
import { useEffect, useState } from 'react';





export const MovieMessageBoard = () => {
    const { movieId } = useParams();
    console.log('Movie ID:', movieId);
    const fetchMovieDetail = async (id: string) => {
        try {
            const response = await apiClient.get(`/movies/${id}`);
            console.log('Movie Details:', response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {

        
        


    }, [movieId]);





    return <div>Movie Message Board Coming Soon!</div>;



}