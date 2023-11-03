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
import { useParams } from 'next/navigation';
import CommentSection from '@/components/SingleItem/CommentSection';

const tempItems = new Map();
tempItems.set("1", {
  category: "clothing",
  photos: [
    {
      id: "",
      src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c76e2119-acb7-4944-9085-d4f5ae2bda4a/go-flyease-easy-on-off-shoes-LGmqKx.png"
    },
    {
        id: "",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bbe6f776-12d9-43b3-a8d0-338a95180a0c/go-flyease-easy-on-off-shoes-LGmqKx.png"
    },
    {
        id: "",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0af510b3-6532-46c9-a315-95405e03ae52/go-flyease-easy-on-off-shoes-LGmqKx.png"
    },
    {
        id: "",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4face735-6dae-4db4-8456-99936374addf/go-flyease-easy-on-off-shoes-LGmqKx.png"
    }
  ],
  descriptors: {
    listingTitle: "Nike Go FlyEase",
    sellerId: "Michael Jordan",
    email: "michael.jordan@emory.edu",
    phone: "111-111-1111",
    description: "I am selling brand new size 12 men’s Nike Go FlyEase shoes at a discounted price. These shoes can easily be put on/off without reaching down. There is nothing wrong with these shoes, just too small for me.",
    price: 75,
    condition: "New",
    pickup: "Dobbs Hall Main Lobby"
  }
});
tempItems.set("2", {
  category: "clothing",
  photos: [
    {
      id: "",
      src: "https://lsco.scene7.com/is/image/lsco/A34940028-alt3-pdp-lse?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=660&hei=726"
    },
    {
        id: "",
        src: "https://lsco.scene7.com/is/image/lsco/A34940028-detail1-pdp?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=660&hei=726"
    },
    {
        id: "",
        src: "https://lsco.scene7.com/is/image/lsco/A34940028-alt1-pdp-lse?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=660&hei=726"
    },
    {
        id: "",
        src: "https://lsco.scene7.com/is/image/lsco/A34940028-dynamic1-pdp?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=660&hei=726"
    }
  ],
  descriptors: {
    listingTitle: "Levi's Baggy Dad Women's Jeans",
    sellerId: "Emma Chamberlain",
    email: "emma.chamberlain@emory.edu",
    phone: "111-111-1111",
    description: "These jeans are slightly used, but they're pretty much new. They fit really well around the waist, and they're loose around the legs. Just did fit my style anymore, but they're really cute anyways.",
    price: 38.75,
    condition: "Used",
    pickup: "Clairmont CRC Building F"
  }
});
tempItems.set("3", {
  category: "",
  photos: [
    {
      id: "",
      src: ""
    }
  ],
  descriptors: {
    listingTitle: "",
    sellerId: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    condition: "",
    pickup: ""
  }
});
tempItems.set("4", {
  category: "",
  photos: [
    {
      id: "",
      src: ""
    }
  ],
  descriptors: {
    listingTitle: "",
    sellerId: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    condition: "",
    pickup: ""
  }
});
tempItems.set("5", {
  category: "",
  photos: [
    {
      id: "",
      src: ""
    }
  ],
  descriptors: {
    listingTitle: "",
    sellerId: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    condition: "",
    pickup: ""
  }
});
tempItems.set("6", {
  category: "",
  photos: [
    {
      id: "",
      src: ""
    }
  ],
  descriptors: {
    listingTitle: "",
    sellerId: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    condition: "",
    pickup: ""
  }
});
tempItems.set("7", {
  category: "",
  photos: [
    {
      id: "",
      src: ""
    }
  ],
  descriptors: {
    listingTitle: "",
    sellerId: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    condition: "",
    pickup: ""
  }
});
tempItems.set("8", {
  category: "",
  photos: [
    {
      id: "",
      src: ""
    }
  ],
  descriptors: {
    listingTitle: "",
    sellerId: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    condition: "",
    pickup: ""
  }
});
tempItems.set("9", {
  category: "",
  photos: [
    {
      id: "",
      src: ""
    }
  ],
  descriptors: {
    listingTitle: "",
    sellerId: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    condition: "",
    pickup: ""
  }
});

export default function SingleItem() {
  const param = useParams();
  const itemId = param.itemId;
    
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Header/>
        <Stack direction="row" sx={{pl: 2, pr: 2}} justifyContent="flex-start" alignItems="center" spacing={2}>
          <Button href="/" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ArrowBack/>}>Back to listings</Button>
          <Stack direction="row">
            <Typography variant="body1" color="initial">Listed in category: </Typography>
            <Link href={'href'} variant="body1">{tempItems.get(itemId).category}</Link>
          </Stack>
        </Stack>
        <Stack direction="column" padding={2}>
          <Grid container direction="row" spacing={3} columns={{sm: 8, md: 12}}>
            <Grid item sm={8} md={7}>
              <ItemPhotos photos={tempItems.get(itemId).photos}/>
            </Grid>
            <Grid item sm={8} md={5}>
              <ItemDescriptors descriptors={tempItems.get(itemId).descriptors}/>
            </Grid>
          </Grid>
          <CommentSection/>
        </Stack>
      </div>
    </Box>
  );
}
