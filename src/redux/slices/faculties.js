import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchFaculties = createAsyncThunk('faculties/fetchFaculties', async () => {
    const { data } = await axios.get('/faculties')
    return data
})

const initialState = {
    faculties: {
        items: [],
        status: 'loading',
    },
}

const facultiesSlice = createSlice({
    name: 'faculties',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchFaculties.pending]: (state) => {
            state.faculties.items = []
            state.faculties.status = 'loading'
        },
        [fetchFaculties.fulfilled]: (state, action) => {
            state.faculties.items = action.payload
            state.faculties.status = 'loaded'
        },
        [fetchFaculties.rejected]: (state) => {
            state.faculties.items = []
            state.faculties.status = 'error'
        },
    },
})

export const facultiesReducer = facultiesSlice.reducer