import * as React from 'react';
import Box from '@mui/material/Box';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'SwooperMarket',
  description: 'SwooperMarket Buy/Sell/Giveaway Project using Next.js App Router + Material UI v5',
};

/* Creates project skeleton for login pages */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box
            component="main"
            sx={{
              bgcolor: 'background.default',
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
