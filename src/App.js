import React from 'react';

import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { lightTheme, darkTheme } from './styles/theme';

import { useDarkMode } from './styles/useDarkMode';

import Toggle from './components/Toggle';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <Routes />
        <GlobalStyle />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </>
    </ThemeProvider>
  );
}

export default App;
