import { styled } from '@gamex/uix';

const Brand = styled('div', ({ $theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  borderBottom: `1px solid ${$theme.colors.contentTertiary}`,
  backgroundColor: $theme.colors.backgroundAlwaysDark,
}));

export default Brand;
