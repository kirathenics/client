import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchFaculties = createAsyncThunk('faculties/fetchFaculties', async () => {
    const { data } = await axios.get('/faculties')
    return data
})

export const fetchFacultiesCharts = createAsyncThunk('faculties/fetchFacultiesCharts', async () => {
    const { data } = await axios.get('/faculties/charts')
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
    facultiesCharts: {
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

        [fetchFacultiesCharts.pending]: (state) => {
            state.facultiesCharts.items = []
            state.facultiesCharts.status = 'loading'
        },
        [fetchFacultiesCharts.fulfilled]: (state, action) => {
            state.facultiesCharts.items = action.payload
            state.facultiesCharts.status = 'loaded'
        },
        [fetchFacultiesCharts.rejected]: (state) => {
            state.facultiesCharts.items = []
            state.facultiesCharts.status = 'error'
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