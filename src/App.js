import Movies from './components/Movies';
import { useState, useEffect } from 'react';
import { APIKEY } from './env.js';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { fetchData } from './actions';

function App() {
  // const [movies, setMovies] = useState([]);
  const [searchField, setSearchField] = useState('');
  const URL = `https://www.omdbapi.com/?s=${searchField}&apikey=c83647df`;
  
  const movies =  useSelector(state => state.movies);

  const dispatch = useDispatch();

  function getMovies() {
    // fetch(encodeURI(URL))
      // .then(res => res.json())
      // .then(movies => setMovies(movies.Search))
    dispatch(fetchData(URL))
  }

  useEffect(getMovies, [dispatch]);
  useEffect(getMovies, [searchField]);
  
  let timer;
  function handleChange(event) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setSearchField(event.target.value);
    }, 1000)
  }

  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      {
        movies.pending ? "Loading..." :
         movies.error ? movies.error :
          <Movies movies={movies.movies} />

      }
      {/* <Movies movies={movies} /> */}
    </div>
  );
}

export default App;
