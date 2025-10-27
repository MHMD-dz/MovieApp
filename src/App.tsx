import { use, useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import Card from './components/Card';
import { useDebounce } from 'react-use';


const ApiBaseUrl = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
    }
  };


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorM, seterrorM] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    1000,
    [searchTerm]
  );


  const FetchFunc = async (query = '') => {
    setLoading (true);
    seterrorM('');
    try{
      const endpoint = query ?
        `${ApiBaseUrl}/search/movie?query=${encodeURIComponent(query)}` :
        `${ApiBaseUrl}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok) {
        throw new Error ('Network response was not ok');
      }
      const data = await response.json();
      if(data.results.length === 0) {
        seterrorM('No movies found');
        setMovies([]);
        return;
      }
      setMovies(data.results);
    } catch (error) {
      seterrorM('Failed to fetch data from API');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchFunc(debouncedSearchTerm);
  }, [debouncedSearchTerm])
  return (
    <main>
      <div className='pattern' >
        <div className='wrapper' >
          <header>
            <img src="./hero.png" alt="hero Banner" />
            <h1>Find <span className='text-gradient' >Movies</span> You'll Enjoy Without the Hassel</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='all-movies'>
            <h2 className='my-[40px]' >All Movies</h2>
            { loading ? 
                ( <Spinner /> ) : 
                 errorM ? ( <p className='text-red-500' >{errorM}</p> ) :
                ( 
                  <ul>
                    {movies.map((movie: any) => (
                      <Card movie={movie} />
                    ))}
                  </ul>
                  )
            }
          </section>

        </div>
      </div>
    </main>
  )
}

export default App
