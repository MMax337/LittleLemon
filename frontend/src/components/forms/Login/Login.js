import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Form.css'
import './Login.css'
import { Link, Navigate } from 'react-router-dom';
import CSRFToken from '../CSRFToken';
import { login } from '../../../features/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { useState, useEffect } from 'react';
import useAuthRedirect from '../../../hooks/useAuthRedirect';




const Login = () => {
  const user = useSelector(state => state.auth.value);
  const dispatch = useDispatch();

  const { checkingAuth } = useAuthRedirect(2000);



  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })


  if (checkingAuth) return <LoadingSpinner/>

  if (user.isAuthenticated) {
    return <Navigate to='/dashboard'/>
  }

  return (
    <div className='form-container'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          dispatch(login(values))
            .unwrap()
            .then(() => window.alert('Login successful'))
            .catch(err => {
              console.log(err);
              window.alert("Wrong email or password🥺")
            })
        }}
      >
        {( {touched, values, errors} ) =>
          <Form className='form'>
            <CSRFToken/>
            <h1>Login</h1>
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
              <button type="submit" className='submit-btn'>Login</button>
            </div>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default Login;