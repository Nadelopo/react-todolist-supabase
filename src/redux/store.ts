import { configureStore } from '@reduxjs/toolkit'
import categories from './slices/CategorieSlice'
import tasks from './slices/TaskSlice'
import { useDispatch } from 'react-redux'
import user from './slices/UserSlice'

export const store = configureStore({
  reducer: {
    categories,
    tasks,
    user,
  },
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
