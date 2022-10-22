import React, { useEffect } from 'react'

import { useRoutes } from 'react-router-dom'
import Auth from '@/pages/Auth'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Navbar } from './components/Navbar'
import { setUserData, setUserId } from './redux/slices/UserSlice'
import { supabase } from './supabase'
import { useAppDispatch } from './redux/store'
import { getTasks } from './redux/slices/TaskSlice'
import { getCategories } from './redux/slices/CategorieSlice'

export const routesName = {
  Auth: '/auth',
  Home: '/',
  Profile: '/profile',
}

const App = () => {
  const routes = useRoutes([
    { path: routesName.Auth, element: <Auth /> },
    { path: routesName.Home, element: <Home /> },
    { path: routesName.Profile, element: <Profile /> },
  ])
  return routes
}

const AppWrapper = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = JSON.parse(
      localStorage.getItem('supabase.auth.token') || '{}'
    )?.currentSession?.access_token
    if (token) {
      supabase.auth.api.getUser(token).then((User) => {
        const id = User.user?.id || ''
        dispatch(setUserData(id))
        dispatch(getCategories(id))
        dispatch(getTasks(id))
      })
      dispatch(setUserId())
    }
  }, [])

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session && session.user) {
      dispatch(setUserData(session.user?.id || ''))
      dispatch(setUserId())
      dispatch(getCategories(session.user.id))
      dispatch(getTasks(session.user.id))
    } else {
      dispatch(setUserData(''))
      dispatch(setUserId())
    }
  })

  return (
    <div className="container">
      <Navbar />
      <App />
    </div>
  )
}

export default AppWrapper
