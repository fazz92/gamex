import React, { useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { styled } from '@gamex/uix';
import { Input } from '@gamex/uix/lib/input';
import { FormControl } from '@gamex/uix/lib/form-control';
import { BlockButton } from '@gamex/uix/lib/button';
import { H3 } from '@gamex/uix/lib/typography';
import { useSnackbar, DURATION } from '@gamex/uix/lib/snackbar';
import { loginValidator } from 'utils';
import { useAppContext } from 'hooks';
import { Root } from 'ui/components/styled-components';
import { LOGIN } from 'store/reducers/auth';
import { apiRequest } from 'utils';

const Center = styled('div', {
  maxWidth: '100%',
  margin: '0 auto',
  width: '400px',
  padding: '0 20px',
});

export const Login = () => {
  const { auth, dispatch } = useAppContext();
  const history = useHistory();
  const { enqueue } = useSnackbar();

  useEffect(() => {
    if (auth) {
      history.replace('/games');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(async (values) => {
    try {
      const response = await apiRequest({ url: 'login', body: values  });
      if (response.status === 'error') {
        enqueue({
          message: response.error,
        }, DURATION.small);
      } else {
        dispatch({
          type: LOGIN,
          payload: response.player,
        });
        history.replace('/games');
      }
    } catch(err) {
      enqueue({
        message: 'Something went wrong! Try again later',
      }, DURATION.small);
    }
  }, [dispatch, enqueue, history]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: loginValidator,
    onSubmit,
  });
  const { errors, handleChange, handleSubmit, values, touched } = formik;

  return (
    <Root>
      <Center>
        <H3 marginBottom='scale700'>Login</H3>
        <form onSubmit={handleSubmit}>
          <FormControl
            caption={(touched.username && errors.username) ? errors.username : ''}
            label='User name'
            error={touched.username && !!errors.username}
          >
            <Input
              id='username'
              name='username'
              value={values.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl
            caption={(touched.password && errors.password) ? errors.password : ''}
            label='Password'
            error={touched.password && !!errors.password}
          >
            <Input
              id='password'
              name='password'
              type='password'
              value={values.password}
              onChange={handleChange}
            />
          </FormControl>
          <BlockButton type='submit'>Submit</BlockButton>
        </form>
      </Center>
    </Root>
  );
};
