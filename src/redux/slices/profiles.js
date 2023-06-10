import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
    const { data } = await axios.get('/profiles')
    return data
})

export const fetch20Profiles = createAsyncThunk('profiles/fetch20Profiles', async () => {
    const { data } = await axios.get('/profiles/20')
    return data
})

export const fetchProfilesFiltered = createAsyncThunk('profiles/fetchProfilesFiltered', async (params) => {
    const { data } = await axios.get('/profiles/filter', { params })
    return data
})

export const fetchProfilesHIndex = createAsyncThunk('profiles/fetchProfilesHIndex', async (params) => {
    const { data } = await axios.get('/profiles/hIndex', { params })
    return data
})

const initialState = {
    profiles: {
        items: [],
        changedItems: [],
        status: 'loading',
        filtered: false,
        searched: 0,
    },
    profilesHIndex: {
        items: [],
        status: 'loading',
    },
}

const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        searchProfiles: (state, action) => {
            if (action.payload !== "") {
                if (!state.profiles.filtered) {
                    state.profiles.items = state.profiles.items.filter(object => object.fullName.toLowerCase().includes(action.payload.toLowerCase()))
                }
                else {
                    state.profiles.changedItems = state.profiles.changedItems.filter(object => object.fullName.toLowerCase().includes(action.payload.toLowerCase()))
                }
            }
            if (!state.profiles.filtered) {
                state.profiles.searched = state.profiles.items.length
            }
            else {
                state.profiles.searched = state.profiles.changedItems.length
            }
        },
        sortProfiles: (state, action) => {
            if (state.profiles.changedItems.length === 0) {
                state.profiles.items = state.profiles.items.sort((a, b) => a[action.payload.field] > b[action.payload.field] ? action.payload.seq : -action.payload.seq)
            }
            else {
                state.profiles.changedItems = state.profiles.changedItems.sort((a, b) => a[action.payload.field] > b[action.payload.field] ? action.payload.seq : -action.payload.seq)
            }  
        },
        filterProfiles: (state, action) => {
            if (action.payload.arrDepartments.length !== 0 ||
                action.payload.arrFaculties.length !== 0 ||
                action.payload.arrTitles.length !== 0) {
                state.profiles.filtered = true
                state.profiles.changedItems = state.profiles.items.filter(item => {
                    return action.payload.arrDepartments.some(department => item.department === department) ||
                            action.payload.arrFaculties.some(faculty => item.faculty === faculty) ||
                            action.payload.arrTitles.some(title => item.title === title)
                })
            }
            else {
                state.profiles.changedItems = []
                state.profiles.filtered = false
            }
        },
        setProfiles: (state, action) => {
            if (!state.profiles.filtered) {
                state.profiles.items = action.payload
            }
            else {
                state.profiles.changedItems = action.payload
            }
            state.profiles.searched = 0
        }
    },
    extraReducers: {
        [fetchProfiles.pending]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'loading'
            state.profiles.filtered = false
        },
        [fetchProfiles.fulfilled]: (state, action) => {
            state.profiles.items = action.payload
            state.profiles.status = 'loaded'
            state.profiles.filtered = false
        },
        [fetchProfiles.rejected]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'error'
            state.profiles.filtered = false
        },

        [fetchProfilesHIndex.pending]: (state) => {
            state.profilesHIndex.items = []
            state.profilesHIndex.status = 'loading'
        },
        [fetchProfilesHIndex.fulfilled]: (state, action) => {
            state.profilesHIndex.items = action.payload
            state.profilesHIndex.status = 'loaded'
        },
        [fetchProfilesHIndex.rejected]: (state) => {
            state.profilesHIndex.items = []
            state.profilesHIndex.status = 'error'
        },

        [fetch20Profiles.pending]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'loading'
            state.profiles.filtered = false
        },
        [fetch20Profiles.fulfilled]: (state, action) => {
            state.profiles.items = action.payload
            state.profiles.status = 'loading'
            state.profiles.filtered = false
        },
        [fetch20Profiles.rejected]: (state) => {
            state.profiles.items = []
            state.profiles.status = 'error'
            state.profiles.filtered = false
        },
    },
})

export const profilesReducer = profilesSlice.reducer
export const { searchProfiles, sortProfiles, filterProfiles, setProfiles } = profilesSlice.actions