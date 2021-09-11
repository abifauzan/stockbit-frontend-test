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
    hasMoreArticle: false,
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
        clearData: (state, action) => {
            state.movies = []
        },
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
                    state.hasMoreArticle = false
                } else {
                    if (parseInt(action.payload.totalResults) > 5) {
                        state.hasMoreArticle = true
                    } else {
                        state.hasMoreArticle = false
                    }
                    state.movies = action.payload.Search.filter((el, index, self) =>
                    index === self.findIndex((t) => (
                        t.imdbID === el.imdbID
                    ))
                )
                    state.totalResults = parseInt(action.payload.totalResults)
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
                if (action.payload.Response === 'False') {
                    state.hasMoreArticle = false
                } else {
                    state.hasMoreArticle = true
                    state.movies = [...state.movies, ...action.payload.Search]
                }
            })
    }
})

export const {
    clearData,
} = movieListSlice.actions

export const selectMovies = (state) => state.movieList.movies
export const selectTotalResults = (state) => state.movieList.totalResults
export const selectHasMoreArticle = (state) => state.movieList.hasMoreArticle
export const selectStatus = (state) => state.movieList.status
export const selectStatusFetchMore = (state) => state.movieList.statusFetchMore

export default movieListSlice.reducer