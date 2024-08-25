import BookingForm from "./forms/BookingForm/BookingForm"

const BookingPage = ({bookingTimes, submitForm}) => {
  return (
    <BookingForm bookingTimes={bookingTimes} submitForm={submitForm}/>
  )
}

export default BookingPage;