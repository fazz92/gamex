import React, { useCallback } from 'react';

import { Button } from '@gamex/uix/lib/button';
import { useAppContext } from 'hooks';
import { ThemeIcon } from 'ui/components/icons';
import { THEME_CHANGE } from 'store/reducers/theme'; 

function ThemeToggle() {
  const { dispatch, theme } = useAppContext();
  const clickHandler = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    dispatch({ type: THEME_CHANGE, payload: nextTheme });
  }, [dispatch, theme]);

  return (
    <Button onClick={clickHandler}>
      <ThemeIcon />
    </Button>
  );
}

export default ThemeToggle;
