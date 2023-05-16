import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
    const { data } = await axios.get('/departments')
    return data
})

const initialState = {
    departments: {
        items: [],
        status: 'loading',
    },
}

const departmentsSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchDepartments.pending]: (state) => {
            state.departments.items = []
            state.departments.status = 'loading'
        },
        [fetchDepartments.fulfilled]: (state, action) => {
            state.departments.items = action.payload
            state.departments.status = 'loaded'
        },
        [fetchDepartments.rejected]: (state) => {
            state.departments.items = []
            state.departments.status = 'error'
        },
    },
})

export const departmentsReducer = departmentsSlice.reducer