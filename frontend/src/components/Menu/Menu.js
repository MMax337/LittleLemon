import './Menu.css'
import DishCard from '../DishCard/DishCard'

import greek_salad from '../../assets/greek salad.jpg'
import bruchetta from '../../assets/bruchetta.svg'
import lemon_desert from '../../assets/lemon dessert.jpg'


const dishes = [
  {
    name: "Greek salad",
    price: 12.99,
    description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    image: greek_salad,
  },
  {
    name: "Bruchetta",
    price: 5.99,
    description: "Our Bruchetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    image: bruchetta,
  },
  {
    name: "Lemon Dessert",
    price: 5.00,
    description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    image: lemon_desert,
  }
];

const Menu = () => {
  return (
    <div id="menu">
      <div className='main-info'>
        <h1>This weeks specials!</h1>
        <button className="btn-menu">Online Menu</button>
      </div>
      <div className="menu">
      {
        dishes.map(dish => (<DishCard key={dish.name} dish={dish}></DishCard>))
      }
      </div>
    </div>
  )
}

export default Menu;