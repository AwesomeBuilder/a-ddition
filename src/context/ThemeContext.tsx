// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const resolveBackground = (bg: string) => {
    switch (bg) {
      case 'bw-gradient':
        return 'linear-gradient(135deg, white, black)';
        case 'rainbow-gradient':
          return `repeating-linear-gradient(
            135deg,
            red 0% 5%,
            orange 5% 10%,
            yellow 10% 15%,
            green 15% 20%,
            blue 20% 25%,
            indigo 25% 30%,
            violet 30% 35%
          )`;        
      default:
        return bg; // assume it's a hex value like #ffffff
    }
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
