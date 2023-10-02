import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link';
import SearchBar from '@/components/HomePage/SearchBar';
import Listings from '@/components/HomePage/Listings';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
          {/* TODO: add in logo */}
          <Typography variant="h5" sx={{color: "#0033a0"}}></Typography>
          <SearchBar placeHolderText="Search SwooperMarket"/>
        </Grid>
        <Listings/>
      </div>
    </Box>
  );
}
