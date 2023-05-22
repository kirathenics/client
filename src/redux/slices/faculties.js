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

export const fetchFacultiesGraphs = createAsyncThunk('faculties/fetchFacultiesGraphs', async () => {
    const { data } = await axios.get('/faculties/graphs')
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
    facultiesGraphs: {
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

        [fetchFacultiesGraphs.pending]: (state) => {
            state.facultiesGraphs.items = []
            state.facultiesGraphs.status = 'loading'
        },
        [fetchFacultiesGraphs.fulfilled]: (state, action) => {
            state.facultiesGraphs.items = action.payload
            state.facultiesGraphs.status = 'loaded'
        },
        [fetchFacultiesGraphs.rejected]: (state) => {
            state.facultiesGraphs.items = []
            state.facultiesGraphs.status = 'error'
        },
    },
})

export const facultiesReducer = facultiesSlice.reducer