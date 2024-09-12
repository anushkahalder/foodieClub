import React from 'react'
import { Link } from 'react-router-dom'
import '../components/Navbar.css'

const Navbar = () => {
  return (
<div className='navBar'>
    <div className='logo'>FoodieClub</div>  
    <div className='navLinks'>
        <Link to="/"><li>Recipes</li></Link>       
    </div>
</div>

  )
}

export default Navbar
