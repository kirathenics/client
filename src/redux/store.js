import { configureStore } from '@reduxjs/toolkit'
import { profilesReducer } from './slices/profiles'

// сделать export default
export const store = configureStore({
    reducer: {
        profiles: profilesReducer
    }
})