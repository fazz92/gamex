import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from '@gamex/uix';
import { SnackbarProvider } from '@gamex/uix/lib/snackbar';
import { useAppContext } from 'hooks';
import { THEMES } from 'utils';

function Theme({ children }) {
  const { theme } = useAppContext();
  const currentTheme = THEMES[theme];

  return (
    <ThemeProvider theme={currentTheme}>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

Theme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Theme;
