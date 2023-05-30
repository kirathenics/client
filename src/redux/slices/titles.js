import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchTitlesPies = createAsyncThunk('titles/fetchTitlesPies', async () => {
    const { data } = await axios.get('/titles/pies')
    return data
})

export const fetchTitlesLines = createAsyncThunk('titles/fetchTitlesLines', async () => {
    const { data } = await axios.get('/titles/lines')
    return data
})

const initialState = {
    titlesPies: {
        items: [],
        status: 'loading',
    },
    titlesLines: {
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

        [fetchTitlesLines.pending]: (state) => {
            state.titlesLines.items = []
            state.titlesLines.status = 'loading'
        },
        [fetchTitlesLines.fulfilled]: (state, action) => {
            state.titlesLines.items = action.payload
            state.titlesLines.status = 'loaded'
        },
        [fetchTitlesLines.rejected]: (state) => {
            state.titlesLines.items = []
            state.titlesLines.status = 'error'
        },
    },
})

export const titlesReducer = titlesSlice.reducer