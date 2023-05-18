import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
    const { data } = await axios.get('/profiles')
    return data
})

export const fetchProfilesFiltered = createAsyncThunk('profiles/fetchProfilesFiltered', async (params) => {
    //const { data } = await axios.get('/profiles/filter', JSON.stringify(params), {headers: {"Content-Type": "application/json"}})
    const { data } = await axios.get('/profiles/filter', { params })
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
    reducers: {
        sortProfiles: (state, action) => {
            state.profiles.items = state.profiles.items.sort((a, b) => a[action.payload.field] > b[action.payload.field] ? action.payload.seq : -action.payload.seq)
        },
        searchProfiles: (state, action) => {
            console.log(action.payload)
            //console.log(action)
            state.profiles.items = state.profiles.items.filter(object => object.fullName.toLowerCase().includes(action.payload.toLowerCase()))
            //state.profiles.items = state.profiles.items.filter(object => object.fullName.toLowerCase().includes(action.payload))
            /*return data.filter(obj =>
                Object.values(obj)
                  .some(value => value.toString().toLowerCase().includes(query.toLowerCase()))
              );*/
        },
        setProfiles: (state, action) => {
            state.profiles.items = action.payload
        }
    },
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
export const { sortProfiles, searchProfiles, setProfiles } = profilesSlice.actions