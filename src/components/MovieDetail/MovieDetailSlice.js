import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    fetchMovieDetail,
} from '../../services/MovieApi';

const initialState = {
    movie: {},
    status: 'idle',
}

export const fetchMovie = createAsyncThunk(
    'movieDetail/fetchMovie',
    async (name) => {
        const response = await fetchMovieDetail(name)
        return response
    }
)

export const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState,
    reducers: {
        fetchMovieData: (state, action) => {
            state.movie = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovie.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchMovie.rejected, (state) => {
                state.status = 'rejected'
                // state.movies = []
            })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.status = 'idle'
                state.movie = action.payload
            })
    }
})

export const {
    fetchMovieData,
} = movieDetailSlice.actions

export const selectMovie = (state) => state.movieDetail.movie
export const selectStatus = (state) => state.movieDetail.status

export default movieDetailSlice.reducer