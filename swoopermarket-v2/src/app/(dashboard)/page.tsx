import * as React from 'react';
import Box from '@mui/material/Box';
import Listings from '@/components/HomePage/Listings';

async function getListings() {
  try {
    const res = await fetch(process.env.API_URL + 'api/listing', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.log('Failed to fetch data')
      return null
    }
   
    return res.json()
  } catch (error) {
    console.log('Error in fetch')
    return null
  }
}

export default async function HomePage() {
  // fetch all listings
  const res = await getListings();
  let listings
  if(res === null) {
    listings = null
  } else {
    listings = res.rows
  }
  

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Listings listings={listings}/>
      </div>
    </Box>
  );
}
