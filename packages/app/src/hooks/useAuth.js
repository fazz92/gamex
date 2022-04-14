import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { useAppContext } from 'hooks';

const PROTECTED_ROUTE = "/games";

export const useAuth = () => {
  const location = useLocation();
  const history = useHistory();

  const { auth } = useAppContext();

  useEffect(() => {
    const isProctedRoute = location.pathname.startsWith(PROTECTED_ROUTE);

    if (isProctedRoute && !auth) {
      history.replace('/');
    }
  }, [auth, history, location]);
};
