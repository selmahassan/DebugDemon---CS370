'use client'
import * as React from 'react';
import { Box, Grid, Stack, Link, Button, Typography } from '@mui/material';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';
import ItemPhotos from '@/components/SingleItem/ItemPhotos';
import CloseIcon from '@mui/icons-material/Close';

type FormData = {
    title: string;
    description: string;
    category: string;
    condition: string;
    price: number;
    pickup: string;
};


type SetShowPreview = (show: boolean) => void;

export default function PreviewListing({ formData, setShowPreview } : { formData: FormData, setShowPreview: SetShowPreview}) {
  const handleBackClick = () => {
    setShowPreview(false); // Hide the preview and go back to the form
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 3}}>
      <div>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Button onClick={handleBackClick} sx={{borderRadius: 50, width: "fit-content"}} startIcon={<CloseIcon/>}>Close Preview</Button>
          <Stack direction="row">
            <Typography variant="body1" color="initial">Listed in category: </Typography>
            <Link href={'href'} variant="body1">{formData.category}</Link>
          </Stack>
        </Stack>
        <Grid container direction="row" spacing={2} padding={2} columns={{sm: 8, md: 12}}>
          <Grid item sm={8} md={7}>
            <ItemPhotos photos={[{id: "", src:"https://lsco.scene7.com/is/image/lsco/A34940028-alt3-pdp-lse?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=660&hei=726"}, {id: "", src:"https://lsco.scene7.com/is/image/lsco/A34940028-detail1-pdp?fmt=avif&qlt=40&resMode=bisharp&fit=crop,0&op_usm=0.6,0.6,8&wid=660&hei=726"}]}/>
          </Grid>
          <Grid item sm={8} md={5}>
            <ItemDescriptors descriptors={{
                listingTitle: formData.title,
                sellerId: "my_username",
                description: formData.description,
                price: formData.price,
                condition: formData.condition,
                pickup: formData.pickup
            }}/>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}