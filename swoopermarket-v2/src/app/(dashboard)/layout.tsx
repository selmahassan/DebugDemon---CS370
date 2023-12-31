import * as React from 'react';
import Box from '@mui/material/Box';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import NavBar from '@/components/NavBar/NavBar';

export const metadata = {
  title: 'SwooperMarket',
  description: 'SwooperMarket Buy/Sell/Giveaway Project using Next.js App Router + Material UI v5',
};

const DRAWER_WIDTH = 240;

/* Creates project skeleton with app header and navigation bar */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeRegistry>
          <NavBar/>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: {md: `${DRAWER_WIDTH}px`, lg: `${DRAWER_WIDTH}px`},
              mt: 3,
              p: 3,
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
