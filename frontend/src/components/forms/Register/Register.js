import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CSRFToken from '../CSRFToken';
import '../Form.css'
import './Register.css'

import { Link, Navigate } from "react-router-dom";
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../features/auth/authActions';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import useAuthRedirect from '../../../hooks/useAuthRedirect';

const Register = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.value)

  const [userCreated, setUserCreated] = useState(false);

  const { checkingAuth } = useAuthRedirect(2000);


  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  if (checkingAuth) return <LoadingSpinner/>

  if (user.isAuthenticated) return <Navigate to='/' replace={true} />
  else if (userCreated) return <Navigate to='/login' />
  else return (
    <div className='form-container'>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          dispatch(register(values))
            .unwrap() // if promise rejected then unwrap will throw an error
            .then(() => setUserCreated(true))
            .catch( (error) => {
              setErrors( {...error } );
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {( {touched, values, errors, status, setStatus, isSubmitting} ) =>
          <Form className='form'>
            <CSRFToken />
            <h1>Sign up</h1>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                className={!touched.name || values.name  ? '' : 'input-error'}
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
                className={!touched.email || (values.email && !errors.email ) ? '' : 'input-error'}

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
                className={!touched.password || values.password ? '' : 'input-error'}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div>
              <button type="submit" className='submit-btn' disabled={isSubmitting}>Sign up</button>
            </div>
            <p>Already got an account? <Link to="/login" className='login-link'>Login</Link></p>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default Register;