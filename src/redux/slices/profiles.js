import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
    const { data } = await axios.get('/profiles')
    return data
})

export const fetchProfilesFiltered = createAsyncThunk('profiles/fetchProfilesFiltered', async (params) => {
    const { data } = await axios.get('/profiles/filter', params)
    return data
})

const initialState = {
    profiles: {
        items: [],
        status: 'loading',
    },
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
        [fetchProfilesFiltered.pending]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'loading'
        },
        [fetchProfilesFiltered.fulfilled]: (state, action) => {
            state.profiles.items = action.payload
            state.profiles.status = 'loaded'
        },
        [fetchProfilesFiltered.rejected]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'error'
        },
    },
})

export const profilesReducer = profilesSlice.reducer