// ThemeContext.js
import { createContext, useContext, useState, useEffect  } from 'react';

import type { ReactNode } from 'react'

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }:ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize state with value from localStorage if it exists
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false; // Default to light mode
  });

  // Update localStorage and apply class whenever theme changes
  useEffect(() => {
    // 1. Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // 2. Apply class to HTML element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};