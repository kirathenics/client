import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchFaculties = createAsyncThunk('faculties/fetchFaculties', async () => {
    const { data } = await axios.get('/faculties')
    return data
})

export const fetchFacultiesPies = createAsyncThunk('faculties/fetchFacultiesPies', async () => {
    const { data } = await axios.get('/faculties/pies')
    return data
})

export const fetchFacultiesLines = createAsyncThunk('faculties/fetchFacultiesLines', async () => {
    const { data } = await axios.get('/faculties/lines')
    return data
})

const initialState = {
    faculties: {
        items: [],
        status: 'loading',
    },
    facultiesPies: {
        items: [],
        status: 'loading',
    },
    facultiesLines: {
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

        [fetchFacultiesPies.pending]: (state) => {
            state.facultiesPies.items = []
            state.facultiesPies.status = 'loading'
        },
        [fetchFacultiesPies.fulfilled]: (state, action) => {
            state.facultiesPies.items = action.payload
            state.facultiesPies.status = 'loaded'
        },
        [fetchFacultiesPies.rejected]: (state) => {
            state.facultiesPies.items = []
            state.facultiesPies.status = 'error'
        },

        [fetchFacultiesLines.pending]: (state) => {
            state.facultiesLines.items = []
            state.facultiesLines.status = 'loading'
        },
        [fetchFacultiesLines.fulfilled]: (state, action) => {
            state.facultiesLines.items = action.payload
            state.facultiesLines.status = 'loaded'
        },
        [fetchFacultiesLines.rejected]: (state) => {
            state.facultiesLines.items = []
            state.facultiesLines.status = 'error'
        },
    },
})

export const facultiesReducer = facultiesSlice.reducer