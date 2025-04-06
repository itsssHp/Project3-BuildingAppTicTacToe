import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
  background: string;
  text: string;
  card: string;
  border: string;
  button: string;
  isDark: boolean;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    background: isDark ? '#121212' : '#f5f5f5',
    text: isDark ? '#ffffff' : '#000000',
    card: isDark ? '#1f1f2f' : '#ffffff',
    border: isDark ? '#555' : '#ccc',
    button: isDark ? '#4a90e2' : '#007bff',
    isDark,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
