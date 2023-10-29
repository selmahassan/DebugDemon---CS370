import * as React from 'react';
import Box from '@mui/material/Box';
import Listings from '@/components/HomePage/Listings';

export default async function HomePage() {

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Listings/>
      </div>
    </Box>
  );
}
