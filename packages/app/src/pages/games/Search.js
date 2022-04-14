import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Input } from '@gamex/uix/lib/input';

const overrides = {
  Root: {
    style: () => ({
      maxWidth: '400px',
      margin: '0 auto 20px',
    })
  }
};

const Search = ({ onChange }) => {
  return (
    <Input
      onChange={onChange}
      placeholder="Search Games"
      clearable
      clearOnEscape
      overrides={overrides}
    />
  );
};

Search.propTypes = {
  onChange: PropTypes.func
};

export default memo(Search);
