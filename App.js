import React from 'react'
import Navbar from './Navbar'
import Login from './Login'
import Dashboard from './Dashboard'
import Signup from './Signup'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
  ])
  return (
    <div className='h-screen w-scren'>
      <Navbar/>
      <RouterProvider router={router}/>
      
    </div>
  )
}

export default App