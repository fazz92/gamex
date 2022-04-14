import React, { useCallback, useEffect } from 'react';

import { Button } from '@gamex/uix/lib/button';
import { Avatar } from '@gamex/uix/lib/avatar';
import { useSnackbar, DURATION } from '@gamex/uix/lib/snackbar';
import { useAppContext } from 'hooks';
import { LOGOUT } from 'store/reducers/auth';
import eric from 'images/avatar/eric.jpg';
import rebecka from 'images/avatar/rebecka.jpg';
import stoffe from 'images/avatar/stoffe.jpg';

// Temporary as the webpack is unable to load dynamically the images
const USER_MAP = {
  'Eric Beard': eric,
  'Rebecka Awesome': rebecka,
  'Stoffe Rocker': stoffe,
};

const User = () => {
  const { dispatch, auth } = useAppContext();
  const { enqueue } = useSnackbar();

  const logoutHandler = useCallback(() => {
    dispatch({ type: LOGOUT });
  }, [dispatch]);

  useEffect(() => {
    if (auth?.event) {
      enqueue({
        message: auth.event,
        actionMessage: 'Close',
      }, DURATION.small);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.event]);

  return (auth?.id !== undefined)
  ? (
    <>
      <Avatar
        name={auth.name}
        size="25px"
        src={USER_MAP[auth.name]}
      />
      <Button onClick={logoutHandler}>Logout</Button>
    </>
  ) : null;
};

export default User;
