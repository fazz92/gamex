import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { styled } from '@gamex/uix';
import {FlexGrid, FlexGridItem} from '@gamex/uix/lib/flex-grid';
import { useAuth } from 'hooks';
import { Root } from 'ui/components/styled-components';
import Search from './Search';
import List from './List';
import Categories from './Categories';

const SnapContainer = styled('div', () => ({
  maxWidth: '1200px',
  margin: '20px auto 0',
  padding: '0 20px',
}));

export const Games = () => {
  const [search, setSearch] = useState('');
  const [currentCategory, setCategory] = useState(0);
  useAuth();

  const onChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const onCategorySelect = useCallback(selected => {
    setCategory(selected);
  }, []);

  return (
    <Root>
      <SnapContainer>
        <Search onChange={onChange} />
        <FlexGrid
          flexGridColumnCount={2}
          flexGridColumnGap="30px"
          flexDirection={['row', 'column-reverse', 'column-reverse', 'row']}
        >
          <FlexGridItem
            overrides={{
              Block: {
                style: ({ $theme: { mediaQuery } }) => ({
                  width: '100%',
                  [mediaQuery.large]: {
                    width: 'calc(75% - 30px)',
                  },
                }),
              },
            }}
          >
            <List search={search} currentCategory={currentCategory} />
          </FlexGridItem>
          <FlexGridItem
            overrides={{ Block: { style: { width: '25%' } } }}
          >
            <Categories onSelect={onCategorySelect} currentCategory={currentCategory} />
          </FlexGridItem>
        </FlexGrid>
      </SnapContainer>
    </Root>
  );
};
