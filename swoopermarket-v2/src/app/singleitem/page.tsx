import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';

export default function SingleItem() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Header/>
      </div>
    </Box>
  );
}
