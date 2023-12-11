'use client';
import { lightTheme } from '@/themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
