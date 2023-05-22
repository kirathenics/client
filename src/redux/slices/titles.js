import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchTitlesPies = createAsyncThunk('titles/fetchTitlesPies', async () => {
    const { data } = await axios.get('/titles/pies')
    return data
})

export const fetchTitlesGraphs = createAsyncThunk('titles/fetchTitlesGraphs', async () => {
    const { data } = await axios.get('/titles/graphs')
    return data
})

const initialState = {
    titlesPies: {
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
        [fetchTitlesPies.pending]: (state) => {
            state.titlesPies.items = []
            state.titlesPies.status = 'loading'
        },
        [fetchTitlesPies.fulfilled]: (state, action) => {
            state.titlesPies.items = action.payload
            state.titlesPies.status = 'loaded'
        },
        [fetchTitlesPies.rejected]: (state) => {
            state.titlesPies.items = []
            state.titlesPies.status = 'error'
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