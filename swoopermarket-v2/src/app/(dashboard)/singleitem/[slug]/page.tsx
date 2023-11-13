import React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';
import Grid from '@mui/material/Grid';
import ItemPhotos from '@/components/SingleItem/ItemPhotos';
import Stack from '@mui/material/Stack';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CommentSection from '@/components/SingleItem/CommentSection';
import { ItemType } from '@/types/itemType';
import { Descriptor } from '@/types/itemDescriptor';
import { Category } from '@/enums/category';

async function getSingleListing(id: string) {
  try {
    const res = await fetch(process.env.API_URL + 'api/listing/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.log('Failed to fetch single item data')
      return null
    }
    return res.json()
  } catch(error) {
    console.log('Failed to fetch single item data')
    return null
  }
}

export default async function SingleItem({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // fetch listing
  const res = await getSingleListing(slug);
  let listings: ItemType | null
  if(res === null) {
    listings = null
  } else {
    listings = res.product[0]
  }

  // Hard coded some variables
  let descriptions: Descriptor | null

  if (listings === null) {
    descriptions = null
  } else {
    descriptions = {
      listingTitle: listings.product_name,
      sellerId: "1",
      email: "email@emory.edu",
      phone: "111-1111",
      description: listings.descr,
      price: listings.price,
      condition: "New",
      pickup: "Dobbs",
    }
  }
    
  return (
    listings === null ? 
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <Typography variant="h3" color="initial" sx={{mt: 5}}>ITEM NOT FOUND</Typography>
    </Box> : 
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Header/>
        <Stack direction="row" sx={{pl: 2, pr: 2}} justifyContent="flex-start" alignItems="center" spacing={2}>
          <Button href="/" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ArrowBack/>}>Back to listings</Button>
          <Stack direction="row">
            <Typography variant="body1" color="initial">Listed in category: {Category[listings.category_id]}</Typography>
          </Stack>
        </Stack>
        <Stack direction="column" padding={2}>
          <Grid container direction="row" spacing={3} columns={{sm: 8, md: 12}}>
            <Grid item sm={8} md={7}>
              <ItemPhotos photos={[]}/>
            </Grid>
            <Grid item sm={8} md={5}>
              <ItemDescriptors descriptors={descriptions}/>
            </Grid>
          </Grid>
          <CommentSection/>
        </Stack>
      </div>
    </Box>
  )
}
