import { configureStore } from '@reduxjs/toolkit'
import { profilesReducer } from './slices/profiles'
import { top3Reducer } from './slices/top3'

// сделать export default
export const store = configureStore({
    reducer: {
        profiles: profilesReducer,
        top3: top3Reducer,
    }
})