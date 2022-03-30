import { useTheme, ThemeProvider } from 'next-themes';

const useDarkMode = () => {
  const { theme, setTheme } = useTheme();

  return {
    theme,
    isDarkMode: theme === 'dark',
    isLightMode: theme === 'light',
    setTheme,
  };
};

const DarkModeProvider = ({ children }) => (
  <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
);

export { useDarkMode, DarkModeProvider };
