import React from 'react';

import { Block } from '@gamex/uix/lib/block';
import { AppProvider } from 'provider';
import Routes from 'Routes';
import Theme from './Theme';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <Theme>
          <Block>
            <Routes />
          </Block>
        </Theme>
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
