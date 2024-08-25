import Homepage from './Homepage'
import BookingPage from './BookingPage';
import { useState, useReducer } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import { fetchAPI, submitAPI } from '../fetchScript';
import ConfirmedBooking from './ConfirmedBooking/ConfirmedBooking';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

export const initializeTimes = () => fetchAPI(new Date());

export const updateTimes = (times, action) => {
  switch(action.type) {
    case 'selectedDay': // the selected day from user, fetch the Data
      return fetchAPI(action.payload);
    default:
      return times;
  }
}



const Main = () => {
  const [availableTimes, dispatchAvailableTimes] = useReducer(updateTimes, initializeTimes());
  const [bookingInfromation, setBookingInfromation] = useState({});
  const navigate = useNavigate();
  const submitForm = (formData) => {
    console.log("data", formData);
    if(submitAPI(formData)) {
      setBookingInfromation(formData);
      navigate('/confirmation')
    }
  }
  return (
    <main>
      <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/menu" element={<Homepage />}></Route>
      <Route path="/booking" element={<BookingPage
        bookingTimes={{availableTimes, dispatchAvailableTimes}}
        submitForm={submitForm}
      />}>
      </Route>
      <Route path='/confirmation' element={<ConfirmedBooking booking={bookingInfromation}/>}></Route>
      <Route path="/order" element={<Homepage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>

    </Routes>
    </main>
  )

}

export default Main;