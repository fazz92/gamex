import React from 'react';

import { styled } from '@gamex/uix';
import { Spinner } from '@gamex/uix/lib/spinner';

const Overlay = styled('div', {
  position: 'fixed',
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  zIndex: '100',
  backgroundColor: '#ccc'
});
const InnerContainer = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

const PageLoader = (
  <Overlay>
    <InnerContainer>
      <Spinner size={50} />
    </InnerContainer>
  </Overlay>
);

export default PageLoader;
