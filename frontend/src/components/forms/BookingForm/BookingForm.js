import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "../Form.css";

const BookingForm = ({ bookingTimes, submitForm }) => {
  const { availableTimes, dispatchAvailableTimes } = bookingTimes;

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    guests: Yup.number().min(1, 'At least 1 guest').max(10, 'No more than 10 guests').required('Number of guests is required'),
  });

  // today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];


  return (
    <div className="form-container">
      <Formik
        initialValues={{
          name: '',
          email: '',
          date: '',
          time: '',
          guests: 1,
          occasion: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({ values, setFieldValue, touched, setFieldTouched, setTouched }) => (
          <Form className="form">
            <h1>Book a Table</h1>

            <div>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className={!touched.name || values.date ? '' : 'input-error'}
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className={!touched.email || values.email ? '' : 'input-error'}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div>
              <label htmlFor="res-date">Choose date</label>
              <Field
                type="date"
                id="res-date"
                name="date"
                min={today}
                className={!touched.date || values.date ? '' : 'input-error'}

                onChange={(e) => {
                  setFieldValue('date', e.target.value);
                  if (e.target.value !== '') {
                    dispatchAvailableTimes({
                      type: 'selectedDay',
                      payload: new Date(e.target.value),
                    });
                  } else {
                    setFieldTouched('time',false);
                    setFieldValue('time', '')
                  }
                }}
              />
              <ErrorMessage name="date" component="div" className="error-message" />
            </div>

            <div>
              <label htmlFor="res-time">Choose time</label>
              <Field
                as="select"
                id="res-time"
                name="time"
                className={!touched.time || values.time ? '' : 'input-error'}
                disabled={values.date === ''}
              >
                {
                  values.date === '' && (<option value="">Please select a date first</option>)
                }
                {
                  (values.date !=='' && !touched.time) && (<option value="">Select time</option>)
                }
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="time" component="div" className="error-message" />
            </div>

            <div>
              <label htmlFor="guests">Number of guests</label>
              <Field
                type="number"
                id="guests"
                name="guests"
                min="1"
                max="10"
                className={!touched.guests || values.guests ? '' : 'input-error'}
              />
              <ErrorMessage name="guests" component="div" className="error-message" />
            </div>

            <div>
              <label htmlFor="occasion">Occasion</label>
              <Field as="select" id="occasion" name="occasion">
                <option value="">No occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
              </Field>
            </div>

            <div>
              <button
                type="submit"
                className="submit-btn"
                disabled={!values.name || !values.email || !values.date || !values.time || values.guests < 1 || values.guests > 10}
              >
                Make Your reservation
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
