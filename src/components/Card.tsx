import React from 'react'

interface CardProps {
  movie: {
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    original_language: string;
  };
}

const Card = ({ movie : {title , vote_average , poster_path , release_date , original_language} } : CardProps) => {
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"} alt="title" />
        <div className='mt-4' >
            <h3>{title}</h3>
            <div className='content' >
                <span className='rating' >⭐ {vote_average ? vote_average.toFixed(1) : "N/A"}</span>
                <span>•</span>
                <p className='lang' >{original_language}</p>
                <span>•</span>
                <p className='year' >{release_date ? release_date.split('-')[0] : "N/A"}</p>
            </div>
            
        </div>
    </div>
  )
}

export default Card