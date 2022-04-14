import {createTheme, lightThemePrimitives, darkThemePrimitives} from 'baseui';

const LightThemePrimitive = {
  ...lightThemePrimitives,
  primaryFontFamily: 'Lato'
};

const DarkThemePrimitive = {
  ...darkThemePrimitives,
  primaryFontFamily: 'Lato'
};

const LightTheme = createTheme(LightThemePrimitive);
const DarkTheme = createTheme(DarkThemePrimitive);

export {
  LightTheme, DarkTheme, LightThemePrimitive, DarkThemePrimitive,
};