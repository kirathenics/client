import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchTop3 = createAsyncThunk('top3/fetchTop3', async () => {
    const { data } = await axios.get('/top3')
    return data
})

const initialState = {
    top3: {
        items: [],
        status: 'loading',
    },
}

const top3Slice = createSlice({
    name: 'top3',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTop3.pending]: (state) => {
            state.top3.items = []
            state.top3.status = 'loading'
        },
        [fetchTop3.fulfilled]: (state, action) => {
            state.top3.items = action.payload
            state.top3.status = 'loaded'
        },
        [fetchTop3.rejected]: (state) => {
            state.top3.items = []
            state.top3.status = 'error'
        },
    },
})

export const top3Reducer = top3Slice.reducer