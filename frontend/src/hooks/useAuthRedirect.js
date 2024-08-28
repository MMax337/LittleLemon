import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// when a logged in user tries to go to the Login/Register Page,
// there is a brief moment of checking in the backend if the user is logged in
// during fetching user can see a loading spinner, this hook allows to give
// the spinner more time
const useAuthRedirect = (delay = 2000) => {
  const user = useSelector(state => state.auth.value);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!user.loading) {
      setCheckingAuth(false);
      return;
    }

    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return { checkingAuth, isAuthenticated: user.isAuthenticated };
}

export default useAuthRedirect;
