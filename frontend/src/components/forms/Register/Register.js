import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Form.css'
import './Register.css'

const Register = () => {
  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })
  return (
    <div className='form-container'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {( {touched, values} ) =>
          <Form className='form'>
            <h1>Sign up</h1>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                className={!touched.name ? '' : 'input-error'}
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                className={!touched.email ? '' : 'input-error'}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                className={!touched.password ? '' : 'input-error'}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div>
              <button type="submit" className='submit-btn'>Sign up</button>
            </div>
            <p>Already got an account? <a href="/login">Login</a></p>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default Register;