import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    fetchMovieDetail,
    fetchMoviesByName 
} from '../../services/MovieApi';

const initialState = {
    movies: [],
    totalResults: 0,
    status: 'idle',
    statusFetchMore: 'idle',
}

export const fetchInitialMovies = createAsyncThunk(
    'movieList/fetchMoviesByName',
    async (name, nextPage) => {
        const response = await fetchMoviesByName(name, nextPage)
        return response
    }
)

export const fetchMoreMovies = createAsyncThunk(
    'movieList/fetchMoreMovies',
    async (name, nextPage) => {
        const response = await fetchMoviesByName(name, nextPage)

        return response
    }
)

export const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        fetchInitialData: (state, action) => {
            state.movies = action.payload
        },
        fetchMoreData: (state, action) => {
            state.movies = [...state.movies, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialMovies.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchInitialMovies.rejected, (state) => {
                state.status = 'rejected'
                // state.movies = []
            })
            .addCase(fetchInitialMovies.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.Response === 'False') {
                    state.movies = []
                    state.totalResults = 0
                } else {
                    state.movies = action.payload.Search.filter((el, index, self) =>
                    index === self.findIndex((t) => (
                        t.imdbID === el.imdbID
                    ))
                )
                    state.totalResults = action.payload.totalResults
                }
                
            })
            .addCase(fetchMoreMovies.pending, (state) => {
                state.statusFetchMore = 'loading'
            })
            .addCase(fetchMoreMovies.rejected, (state) => {
                state.statusFetchMore = 'rejected'
                // state.movies = []
            })
            .addCase(fetchMoreMovies.fulfilled, (state, action) => {
                state.statusFetchMore = 'idle'
                state.movies = [...state.movies, ...action.payload.Search]
            })
    }
})

export const {
    fetchInitialData,
    fetchMoreData,
} = movieListSlice.actions

export const selectMovies = (state) => state.movieList.movies
export const selectTotalResults = (state) => state.movieList.totalResults

export default movieListSlice.reducer