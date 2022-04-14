import React from 'react';

import { Icon } from '@gamex/uix/lib/icon';

const overrides = {
  Svg: {
    style: ({ $theme }) => {
      return {
        fill: $theme.colors.primaryB
      };
    }
  }
};

export const ThemeIcon = (props) => (
  <Icon overrides={overrides} viewBox='0 0 20 20' title='No Match icon' {...props}>
    <path d="M15.3999 11C15.7999 10.1 16 9 16 8C16 3.6 12.4 0 8 0C3.6 0 0 3.6 0 8C0 9.1 0.200098 10.1 0.600098 11L2.19995 15L13.8 15L15.3999 11ZM11 22L12.6001 18L3.3999 18L5 22L11 22Z" />
  </Icon>
);
