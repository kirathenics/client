import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
    const { data } = await axios.get('/profiles')
    return data
})

export const fetchProfilesFiltered = createAsyncThunk('profiles/fetchProfilesFiltered', async (params) => {
    const { data } = await axios.get('/profiles/filter', { params })
    return data
})

const initialState = {
    profiles: {
        items: [],
        status: 'loading',
        filtered: 'false',
    },
}

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        sortProfiles: (state, action) => {
            state.profiles.items = state.profiles.items.sort((a, b) => a[action.payload.field] > b[action.payload.field] ? action.payload.seq : -action.payload.seq)
        },
        searchProfiles: (state, action) => {
            state.profiles.items = state.profiles.items.filter(object => object.fullName.toLowerCase().includes(action.payload.toLowerCase()))
        },
        setProfiles: (state, action) => {
            state.profiles.items = action.payload
        }
    },
    extraReducers: {
        [fetchProfiles.pending]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'loading'
            state.profiles.filtered = 'false'
        },
        [fetchProfiles.fulfilled]: (state, action) => {
            state.profiles.items = action.payload
            state.profiles.status = 'loaded'
            state.profiles.filtered = 'false'
        },
        [fetchProfiles.rejected]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'error'
            state.profiles.filtered = 'false'
        },

        [fetchProfilesFiltered.pending]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'loading'
            state.profiles.filtered = 'false'
        },
        [fetchProfilesFiltered.fulfilled]: (state, action) => {
            state.profiles.items = action.payload
            state.profiles.status = 'loaded'
            state.profiles.filtered = 'true'
        },
        [fetchProfilesFiltered.rejected]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'error'
            state.profiles.filtered = 'false'
        },
    },
})

export const profilesReducer = profilesSlice.reducer
export const { sortProfiles, searchProfiles, setProfiles } = profilesSlice.actions