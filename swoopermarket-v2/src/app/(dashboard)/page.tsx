import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import Listings from '@/components/HomePage/Listings';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        {/* <Header/> */}
        <Listings/>
      </div>
    </Box>
  );
}
