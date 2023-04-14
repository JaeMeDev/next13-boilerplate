import { PropsWithChildren } from 'react';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '@/styles/defaultTheme';

export default function MockTheme({ children } : PropsWithChildren) {
  return (
    <ThemeProvider theme={defaultTheme}>
      {children}
    </ThemeProvider>
  );
}
