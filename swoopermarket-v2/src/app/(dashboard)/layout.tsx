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
      <body>
        <ThemeRegistry>
          <NavBar/>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              // mt: 3,
              mt: ['0px', '0px', '-25px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
