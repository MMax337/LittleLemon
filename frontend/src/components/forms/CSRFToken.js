import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


const CSRFToken = () => {
  const [csrfToken, setCSRFToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('/api/csrf_cookie');
        const token = Cookies.get('csrftoken');
        setCSRFToken(token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
  )
}

export default CSRFToken;
