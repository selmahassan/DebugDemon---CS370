import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';
import Grid from '@mui/material/Grid';
import ItemPhotos from '@/components/SingleItem/ItemPhotos';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SingleItem() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Header/>
        <Stack direction="row" sx={{pl: 2, pr: 2}} justifyContent="flex-start" alignItems="center" spacing={2}>
          <Button sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ArrowBack/>}>Back to listings</Button>
          <Stack direction="row">
            <Typography variant="body1" color="initial">Listed in category: </Typography>
            <Link href={'href'} variant="body1">{'Clothing'}</Link>
          </Stack>
        </Stack>
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
