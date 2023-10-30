import * as React from 'react';
import Box from '@mui/material/Box';
import Listings from '@/components/HomePage/Listings';

async function getData() {
  // TODO: make fetch non-local URL
  const res = await fetch('https://swoopermarket.vercel.app/api/listing', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function HomePage() {
  const res = await getData();
  let listings = res.rows

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Listings listings={listings}/>
      </div>
    </Box>
  );
}
