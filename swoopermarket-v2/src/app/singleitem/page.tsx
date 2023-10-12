import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';
import Grid from '@mui/material/Grid';
import ItemPhotos from '@/components/SingleItem/ItemPhotos';

export default function SingleItem() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Header/>
        <Grid container direction="row" spacing={2} padding={2} columns={{sm: 8, md: 12}}>
          <Grid item sm={8} md={7}>
            <ItemPhotos/>
          </Grid>
          <Grid item sm={8} md={5}>
            <ItemDescriptors/>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
