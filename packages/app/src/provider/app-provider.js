import React, { useCallback, useReducer } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider, DebugEngine } from 'styletron-react';
import PropTypes from 'prop-types';

import { AppContext } from 'context';
import store, { initialState } from 'store';
import { useUnmountedRef } from 'hooks';

const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine();
const engine = new Styletron();

const AppProvider = ({ children }) => {
  const [state, _dispatch] = useReducer(store, initialState);
  const isUnmoutedRef = useUnmountedRef();

  const dispatch = useCallback((...args) => {
    if (isUnmoutedRef.current) return;

    _dispatch(...args);
  }, [_dispatch, isUnmoutedRef]);


  return (
    <AppContext.Provider value={{ dispatch, ...state }}>
      <StyletronProvider debug={debug} value={engine}>
        {children}
      </StyletronProvider>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppProvider;
