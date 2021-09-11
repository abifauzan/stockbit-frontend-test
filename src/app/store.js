import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import movieListReducer from '../components/MovieList/MovieListSlice'
import movieDetailReducer from '../components/MovieDetail/MovieDetailSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    movieList: movieListReducer,
    movieDetail: movieDetailReducer,
  },
});
