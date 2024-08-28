import './Menu.css'
import DishCard from '../DishCard/DishCard'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton'

import { useEffect, useState } from 'react'

import axios from 'axios'

const Menu = () => {
  const [dishes, setDishes] = useState([])
  useEffect( () => {
    axios.get('menu/?special=true')
      .then(res => setDishes(res.data))
      .catch(err => console.log("Error during fetching menu: ",err))
  }, [])

  return (
    <div id="menu">
      <div className='main-info'>
        <h1>This weeks specials!</h1>
        <PrimaryButton text='Online Menu'/>
      </div>
      <div className="menu">
      {
        dishes.map(dish => (<DishCard key={dish.id} dish={dish}></DishCard>))
      }
      </div>
    </div>
  )
}

export default Menu;