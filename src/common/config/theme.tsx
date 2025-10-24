import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e3f2ff',
      100: '#b3daff',
      200: '#81c3ff',
      300: '#4fabff',
      400: '#1d94ff',
      500: '#037ae6',  // your brand primary color
      600: '#005db4',
      700: '#004182',
      800: '#002551',
      900: '#000a22',
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
