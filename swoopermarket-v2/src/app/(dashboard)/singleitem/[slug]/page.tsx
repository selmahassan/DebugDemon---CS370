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
import { User } from '@/types/user';
import { Comment } from '@/types/comment'

type PhotoType = {
  id: string;
  src: string;
};

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
      // console.log('Failed to fetch single item data')
      return null
    }
    return res.json()
  } catch(error) {
    // console.log('Failed to fetch single item data')
    return null
  }
}

async function getUser(id: string) {
  try {
    const res = await fetch(process.env.API_URL + 'api/user/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!res.ok) {
      // console.log('Failed to fetch user info')
      return null
    }
    return res.json()
  } catch(error) {
    // console.log('Failed to fetch user info')
    return null
  }
}

async function getComments(id: string) {
  try {
    const res = await fetch(process.env.API_URL + 'api/comments/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      // console.log('Failed to fetch comments')
      return null
    }
    
    return res.json()
  } catch(error) {
    // console.log('Failed to fetch comments')
    return null
  }
}

export default async function SingleItem({ params }: { params: { slug: string } }) {
  const { slug } = params
  let name : string = ''
  // fetch listing
  const res = await getSingleListing(slug);
  let listings: ItemType | null
  if(res === null) {
    listings = null
  } else {
    listings = res.product[0]
  }
  
  // fetch user
  let user: User | null
  if(listings === null){
    user = null
  } else {
    const resUser = await getUser(listings.userid)
    user = resUser.user[0]
  }

  // fetch comments
  const resCom = await getComments(slug);

  let comment: Comment[] | null
  if(resCom === null){
    comment = null
  } else {
    comment = resCom.comments;
  }

  // Hard coded some variables
  let descriptions: Descriptor | null

  if (listings === null) {
    descriptions = null
  } else if (user === null) {
    descriptions = {
      listingTitle: listings.product_name,
      sellerId: listings.userid,
      email: "emory@emory.edu",
      phone: "111-1111",
      description: listings.descr,
      price: listings.price,
      condition: listings.condition,
      pickup: listings.pickup,
      sold: listings.sold,
    }
  } else {
    name = user.first_name
    descriptions = {
      listingTitle: listings.product_name,
      sellerId: user.first_name,
      email: user.email,
      phone: user.phone,
      description: listings.descr,
      price: listings.price,
      condition: listings.condition,
      pickup: listings.pickup,
      sold: listings.sold,
    }
  }

  const newPhoto: PhotoType[] = listings?.listing_img
  ? [
      {
        id: "1",
        src: listings.listing_img
      }
    ]
  : [];
   
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
            <Grid item sm={6} md={7}>
              <ItemPhotos photos={newPhoto}/>
            </Grid>
            <Grid item sm={6} md={5}>
              <ItemDescriptors
                descriptors={descriptions}
                listingId={slug}
                userid={listings.userid}
                image={listings.listing_img}
              />
            </Grid>
          </Grid>
          <CommentSection 
            comments={comment}
            listingid = {slug}
            username = {name}
          />
        </Stack>
      </div>
    </Box>
  )
}