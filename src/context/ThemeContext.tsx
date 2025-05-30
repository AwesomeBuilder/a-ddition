// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { resolveBackground } from '../utils/themeUtils';

type Theme = {
  backgroundColor: string;
  textColor: string;
};

const defaultTheme: Theme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
};

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return stored ? JSON.parse(stored) : defaultTheme;
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', JSON.stringify(t));
  };

  useEffect(() => {
    const resolved = resolveBackground(theme.backgroundColor);
    document.body.style.background = resolved;
    document.body.style.color = theme.textColor;
  }, [theme]);  

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
