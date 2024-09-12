import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Recipe from './components/Recipe.jsx'
import RecipeDetails from './components/RecipeDetails.jsx'
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom'

function App() {


  const router = createBrowserRouter([

    {
      path: "/foodieClub",
      element: <><Navbar /><Recipe /></>
    },
    {
      path: "/foodieClub/details/:id",
      element: <><Navbar /><RecipeDetails /></>
    },
   
  ]);

  return (
    <>
 
        <RouterProvider router={router} />
 
    </>
  )
}

export default App
