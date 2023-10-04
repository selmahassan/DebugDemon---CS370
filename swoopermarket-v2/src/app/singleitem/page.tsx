import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';

export default function SingleItem() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Header/>
        <ItemDescriptors/>
      </div>
    </Box>
  );
}
