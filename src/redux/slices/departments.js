import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async () => {
    const { data } = await axios.get('/departments')
    return data
})

export const fetchDepartmentsCharts = createAsyncThunk('departments/fetchDepartmentsCharts', async () => {
    const { data } = await axios.get('/departments/charts')
    return data
})

export const fetchDepartmentsGraphs = createAsyncThunk('departments/fetchDepartmentsGraphs', async () => {
    const { data } = await axios.get('/departments/graphs')
    return data
})

const initialState = {
    departments: {
        items: [],
        status: 'loading',
    },
    departmentsCharts: {
        items: [],
        status: 'loading',
    },
    departmentsGraphs: {
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

        [fetchDepartmentsCharts.pending]: (state) => {
            state.departmentsCharts.items = []
            state.departmentsCharts.status = 'loading'
        },
        [fetchDepartmentsCharts.fulfilled]: (state, action) => {
            state.departmentsCharts.items = action.payload
            state.departmentsCharts.status = 'loaded'
        },
        [fetchDepartmentsCharts.rejected]: (state) => {
            state.departmentsCharts.items = []
            state.departmentsCharts.status = 'error'
        },

        [fetchDepartmentsGraphs.pending]: (state) => {
            state.departmentsGraphs.items = []
            state.departmentsGraphs.status = 'loading'
        },
        [fetchDepartmentsGraphs.fulfilled]: (state, action) => {
            state.departmentsGraphs.items = action.payload
            state.departmentsGraphs.status = 'loaded'
        },
        [fetchDepartmentsGraphs.rejected]: (state) => {
            state.departmentsGraphs.items = []
            state.departmentsGraphs.status = 'error'
        },
    },
})

export const departmentsReducer = departmentsSlice.reducer