import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchTitlesCharts = createAsyncThunk('titles/fetchTitlesCharts', async () => {
    const { data } = await axios.get('/titles/charts')
    return data
})

export const fetchTitlesGraphs = createAsyncThunk('titles/fetchTitlesGraphs', async () => {
    const { data } = await axios.get('/titles/graphs')
    return data
})

const initialState = {
    titlesCharts: {
        items: [],
        status: 'loading',
    },
    titlesGraphs: {
        items: [],
        status: 'loading',
    },
}

const titlesSlice = createSlice({
    name: 'titles',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTitlesCharts.pending]: (state) => {
            state.titlesCharts.items = []
            state.titlesCharts.status = 'loading'
        },
        [fetchTitlesCharts.fulfilled]: (state, action) => {
            state.titlesCharts.items = action.payload
            state.titlesCharts.status = 'loaded'
        },
        [fetchTitlesCharts.rejected]: (state) => {
            state.titlesCharts.items = []
            state.titlesCharts.status = 'error'
        },

        [fetchTitlesGraphs.pending]: (state) => {
            state.titlesGraphs.items = []
            state.titlesGraphs.status = 'loading'
        },
        [fetchTitlesGraphs.fulfilled]: (state, action) => {
            state.titlesGraphs.items = action.payload
            state.titlesGraphs.status = 'loaded'
        },
        [fetchTitlesGraphs.rejected]: (state) => {
            state.titlesGraphs.items = []
            state.titlesGraphs.status = 'error'
        },
    },
})

export const titlesReducer = titlesSlice.reducer