// jest cannot handle swiper, that's why I am mocking it
jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => children,
  SwiperSlide: ({ children }) => children,
}));

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));

jest.mock('swiper/css', () => jest.fn());

import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import BookingForm from './components/BookingForm/BookingForm';
import { initializeTimes, updateTimes } from './components/Main';


test('Renders the BookingForm heading', () => {
  render(<BookingForm bookingTimes={{availableTimes:["12:00","13:00"]}}/>);
  const headingElement = screen.getByText("Book a Table");
  expect(headingElement).toBeInTheDocument();
})

describe('initializeTimes', () => {
  test('returns the correct initial times', () => {
    const times = initializeTimes();
    expect(times.length).toBeGreaterThan(0);
  });
});

describe('updateTimes', () => {
  test('returns the availiable times', () => {
    const day = new Date("2024-08-12");
    const initialState = ["17:00", "18:00"];
    const action = { type: 'selectedDay', payload: day };
    const newState = updateTimes(initialState, action);
    expect(newState.length).toBeGreaterThan(0);
  });

  test('returns the current state if action type is unrecognized', () => {
    const initialState = ["17:00", "18:00"];
    const action = { type: 'UNKNOWN_ACTION' };
    const updatedState = updateTimes(initialState, action);
    expect(updatedState).toEqual(initialState);
  });
});


describe('BookingForm', () => {
  test('submits the form with correct values', async () => {
    const mockSubmitForm = jest.fn();
    const mockDispatchAvailableTimes = jest.fn();

    // Render the component with mock data
    render(
      <BookingForm
        bookingTimes={{ availableTimes: ['17:00', '18:00'], dispatchAvailableTimes: mockDispatchAvailableTimes }}
        submitForm={mockSubmitForm}
      />
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2024-08-12' } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });

    // Check that the input data was entered correctly
    expect(screen.getByLabelText(/Name/i).value).toBe('John Doe');
    expect(screen.getByLabelText(/Email/i).value).toBe('john.doe@example.com');
    expect(screen.getByLabelText(/Choose date/i).value).toBe('2024-08-12');
    expect(screen.getByLabelText(/Choose time/i).value).toBe('18:00');
    expect(screen.getByLabelText(/Number of guests/i).value).toBe('4');
    expect(screen.getByLabelText(/Occasion/i).value).toBe('Birthday');

    // Simulate form submission
    fireEvent.click(screen.getByText(/Make Your reservation/i));

    // Check if the submitForm function was called with the correct data
    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john.doe@example.com',
        date: '2024-08-12',
        time: '18:00',
        guests: 4,
        occasion: 'Birthday',
      });
    })
  });


  test('does not submit the form with invalid values', async () => {
    const mockSubmitForm = jest.fn();
    const mockDispatchAvailableTimes = jest.fn();
  
    // Render the component with mock data
    render(
      <BookingForm
        bookingTimes={{ availableTimes: ['17:00', '18:00'], dispatchAvailableTimes: mockDispatchAvailableTimes }}
        submitForm={mockSubmitForm}
      />
    );
  
    // Fill out the form with invalid values
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText(/Name/i))

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(screen.getByLabelText(/Email/i))

    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText(/Choose date/i))
    
    fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '0' } });
    fireEvent.blur(screen.getByLabelText(/Number of guests/i))

    fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: '' } });

    // Check that validation errors are displayed
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Date is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeDisabled();

    expect(await screen.findByText(/At least 1 guest/i)).toBeInTheDocument();


    // Check that the submit button is disabled due to validation errors
    expect(screen.getByText(/Make Your reservation/i)).toBeDisabled();

    // Simulate form submission
    fireEvent.click(screen.getByText(/Make Your reservation/i));

    // Check if the submitForm function was NOT called
    await waitFor(() => {
      expect(mockSubmitForm).not.toHaveBeenCalled();
    });
  });


});






