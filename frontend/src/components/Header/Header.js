import './Header.css'
import food from '../../assets/restauranfood_zoomed.jpg'
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
    <div className='header-container'>
      <div className='header-container-info'>
        <h1 className='header-title'>Little Lemon</h1>
        <h3 className='header-place'>Chicago</h3>
        <p className="header-description">
          We are a family owned Mediterranean restaurant,
          focused on traditional recipes served with a modern twist.
        </p>
        <Link to='/booking'><PrimaryButton text='Reserve a Table'/></Link>
      </div>
      <div className="header-img-container">
        <img className='food-img' src={food} alt='food in our restaurant'></img>
      </div>
    </div>
    <div className='empty-div'>
    </div>
    </header>
  )
}

export default Header;