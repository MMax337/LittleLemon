import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import axios from "axios";


export const register = createAsyncThunk(
  'auth/register',
  // rejectWithValue is a function provided by the redux toolkit
  // it will call the rejected actiont with the provided  payload
  async ({ email, password, name }, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
      };

      const body = JSON.stringify({ email, password, name });
      const response = await axios.post('/api/register', body, config);

      return response.data;

    } catch (error) {
      console.log('err here', error);

      // if response was recieved but status code was not 200, we return the data from the response
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, { rejectWithValue }) =>{
    console.log(email, password)
    try {
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
      };
      const body = JSON.stringify({ email, password });
      const response = await axios.post('/api/login', body, config);

      return response.data;

    } catch (err) {

      return rejectWithValue(err.response ? err.response.data : err.message);

    }
  }
)

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/authenticated');
      return response.status === 200 ? response.data : rejectWithValue(response.data);
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };

    try {
      const response = await axios.post('/api/logout', config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
)