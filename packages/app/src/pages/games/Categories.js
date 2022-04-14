import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { styled } from '@gamex/uix';
import { H5 } from '@gamex/uix/lib/typography';
import { useSnackbar, DURATION } from '@gamex/uix/lib/snackbar';
import { apiRequest } from 'utils';
import { useAppContext } from 'hooks';
import { CATEGORIES_INIT, CATEGORIES_DONE, CATEGORIES_ERROR } from 'store/reducers/categories';

const ListItems = styled('ul', () => ({
  listStyle: 'none',
  margin: 0,
  padding: 0
}));

const ListItem = styled('li', ({ selected, $theme }) => ({
    padding: '5px 10px',
    cursor: 'pointer',
    backgroundColor: selected ? $theme.colors.backgroundInversePrimary : $theme.colors.background,
    color: selected ? $theme.colors.backgroundLightNegative : $theme.colors.colorPrimary,
}));

const Categories = ({ onSelect, currentCategory }) => {
  const { dispatch, categories } = useAppContext();
  const data = categories.data ?? [];
  const isLoading = categories.loading;
  const isError = categories.error;
  const { enqueue } = useSnackbar();

  const fetchCategories = useCallback(async () => {
    dispatch({ type: CATEGORIES_INIT });

    try {
      const response = await apiRequest({ url: 'categories', method: 'GET' });
      if (response.status === 'error') {
        dispatch({ type: CATEGORIES_ERROR });
        enqueue({
          message: response.error,
        }, DURATION.small);
      } else {
        dispatch({
          type: CATEGORIES_DONE,
          payload: response,
        });
      }
    } catch(err) {
      enqueue({
        message: 'Something went wrong! Try again later',
      }, DURATION.small);
      dispatch({ type: CATEGORIES_ERROR });
    }

  }, [dispatch, enqueue]);

  useEffect(() => {
    if (data?.length || isLoading || isError) {
      return;
    }

    fetchCategories();
  }, [fetchCategories, data, isLoading, isError]);

  const onChange = useCallback((id) => {
    onSelect(id);
  }, [onSelect]);

  return (
    <>
      <H5 marginBottom='scale100'>Categories</H5>
      <ListItems>
        {data.map(({ id, name }) => (
          <ListItem
            key={id}
            onClick={() => onChange(id)}
            selected={currentCategory === id}
          >
            {name}
          </ListItem>
        ))}
      </ListItems>
    </>
  );
};

Categories.propTypes = {
  onSelect: PropTypes.func,
  currentCategory: PropTypes.number,
};

export default Categories;
