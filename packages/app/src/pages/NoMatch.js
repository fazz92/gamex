import React from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@gamex/uix';
import { H4 } from '@gamex/uix/lib/typography';
import { Root } from 'ui/components/styled-components';
import { NonMatchIcon } from 'ui/components/icons';

const Center = styled('div', {
  flexGrow: '1',
  maxWidth: '500px',
  margin: '20px auto 0',
});

const StyledLink = styled(Link, ({ $theme }) => ({
  textDecoration: 'underline',
  color: $theme.colors.primaryA,
}));

const TextCenter = styled('div', () => ({
  textAlign: 'center'
}));

export const NoMatch = () => {
  return (
    <Root>
      <Center>
        <TextCenter>
          <NonMatchIcon size={64} />
          <H4>No Page Found</H4>
          <StyledLink
            data-baseweb='link'
            to='/'
          >Go Back</StyledLink>
        </TextCenter>
      </Center>
    </Root>
  );
};
