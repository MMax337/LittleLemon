import './ConfirmedBooking.css'

const ConfirmedBooking = ({booking}) => {
  const {name, email, date, time, guests, occasion} = booking;
  return (
    <div className='confirmation-container'>
      <div className='confirmation-info'>
        <h1>Your booking was confirmed</h1>
        <div>
          <p>The information about your reservation:</p>
          <p>Name: <span>{name}</span></p>
          <p>Email: <span>{email}</span></p>
          <p>Date: <span>{date}</span></p>
          <p>Time: <span>{time}</span></p>
          <p>Number of guests: <span>{guests}</span></p>
          <p>Occasion: <span>{occasion}</span></p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmedBooking;