import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';
import { useEffect, useState} from 'react';
import { MovieDetailCard } from '../components/MovieDetailCard';
import type { MovieDetail } from '../types/movieResponse';

export const MovieMessageBoard = () => {
    const { movieId } = useParams();
    console.log('Movie ID:', movieId);
    const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

    const fetchMovieDetail = async (id: string) => {
        try {
            const response = await apiClient.get<MovieDetail>(`/movies/detail/${id}`);
            setMovieDetail(response.data);
            console.log('Movie Details:', response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
        fetchMovieDetail(movieId!);
    }, [movieId]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingBottom: '2rem' }}>
            {movieDetail && (
                <>
                    <MovieDetailCard key={movieId} movieDetail={movieDetail} />
                    {/* 這裡將來可以加入評論區元件 */}
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                        {/* <CommentSection movieId={movieId} /> */}
                        <div style={{ 
                            backgroundColor: 'white', 
                            padding: '2rem', 
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            marginTop: '20px'
                        }}>
                            <h2>評論區</h2>
                            <p>這裡將來會放置評論功能...</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};