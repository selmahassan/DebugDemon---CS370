import * as React from 'react';
import Box from '@mui/material/Box';
import Listings from '@/components/HomePage/Listings';

async function getListings() {
  const res = await fetch(process.env.API_URL + 'api/listing', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function HomePage() {
  const res = await getListings();
  let listings = res.rows

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Listings listings={listings}/>
      </div>
    </Box>
  );
}
