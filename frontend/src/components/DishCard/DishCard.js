import './DishCard.css'
import delivery from '../../assets/delivery.png'

const DishCard = ({dish}) => {
  const {name, price, image, description} = dish;
  return (
    <div className="card">
      <img src={image} alt={name}/>
      <div className='card-info'>
        <div className='info-div'>
          <p className='name'>{name}</p>
          <p className='price'>${price}</p>
        </div>
        <p className='description'>{description}</p>
      </div>
      <div className='delivery-container'>
          <p>Order Delivery</p>
          <img className='delivery-img' src={delivery} alt='delivery icon'></img>
      </div>
    </div>
  );
}

export default DishCard;