import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Form.css'
import './Login.css'

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })
  return (
    <div className='form-container'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {( {touched, values} ) =>
          <Form className='form'>
            <h1>Login</h1>
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
              <button type="submit" className='submit-btn'>Login</button>
            </div>
            <p>Don't have an account? <a href="/register">Sign up</a></p>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default Login;