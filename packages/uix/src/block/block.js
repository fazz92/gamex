import React from 'react';
import PropTypes from 'prop-types';
import { Block as BaseBlock } from 'baseui/block';

const overrides = {
  Block: {
    style: ({ $theme }) => {
      return {
        backgroundColor: $theme.colors.background,
        padding: 0,
      };
    }
  }
};

const Block = ({ children, ...rest }) => (
  <BaseBlock overrides={overrides} {...rest}>
    {children}
  </BaseBlock>
);

Block.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Block;
