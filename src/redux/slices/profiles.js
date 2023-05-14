import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
    const { data } = await axios.get('/profiles')
    return data
})

const initialState = {
    profiles: {
        items: [],
        status: 'loading',
    }
}

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfiles.pending]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'loading'
        },
        [fetchProfiles.fulfilled]: (state, action) => {
            state.profiles.items = action.payload
            state.profiles.status = 'loaded'
        },
        [fetchProfiles.rejected]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'error'
        },
    },
})

export const profilesReducer = profilesSlice.reducer