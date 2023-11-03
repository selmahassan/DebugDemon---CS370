import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';
import Grid from '@mui/material/Grid';
import ItemPhotos from '@/components/SingleItem/ItemPhotos';
import Stack from '@mui/material/Stack';
// import Link from '@mui/material/Link';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CommentSection from '@/components/SingleItem/CommentSection';
import { ItemType } from '@/types/itemType';
import { Descriptor } from '@/types/itemDescriptor';

async function getSingleListing(id: string) {
  const res = await fetch(process.env.API_URL + 'api/listing/' + id, {
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

export default async function SingleItem({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // fetch listing
  const res = await getSingleListing(slug);
  let listings: ItemType = res.product[0];

  // Hard coded some variables
  let descriptions: Descriptor = {
    listingTitle: listings.product_name,
    sellerId: "1",
    email: "email@emory.edu",
    phone: "111-1111",
    description: listings.descr,
    price: listings.price,
    condition: "New",
    pickup: "Dobbs",
  }
    
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Header/>
        <Stack direction="row" sx={{pl: 2, pr: 2}} justifyContent="flex-start" alignItems="center" spacing={2}>
          <Button href="/" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ArrowBack/>}>Back to listings</Button>
          <Stack direction="row">
            <Typography variant="body1" color="initial">Listed in category: </Typography>
            {/* <Link href={'href'} variant="body1">{listings.category_id}</Link> */}
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
  );
}
