'use client';
import React, { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const isDark = useThemeStore((theme) => theme.isDarkMode);
  useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-1000');
    document.body.classList.remove('bg-customGreen', 'text-customGreen', 'bg-darkCustomGreen', 'text-darkCustomGreen');
    document.body.classList.add(
      isDark ? 'bg-darkCustomGreen' : 'bg-customGreen',
      isDark ? 'text-darkCustomGreen' : 'text-customGreen'
    );
  }, [isDark]);
  return <>{children}</>;
};

export default ThemeWrapper;
