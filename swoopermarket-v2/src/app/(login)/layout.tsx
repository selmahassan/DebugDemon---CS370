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
          <Box
            component="main"
            sx={{
              bgcolor: 'background.default',
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
