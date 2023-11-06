import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { ItemType } from '@/types/itemType';
import { Box } from '@mui/material';
import { Category } from '@/enums/category';

export default function ListingCard({ item }: { item: ItemType }) {
  const truncatedDescr = item.descr.length > 75 ? item.descr.slice(0, 75) + '...' : item.descr;

  return (
    <Card>
      <CardActionArea href={`/singleitem/${item.listing_id}`}>
        <Image
          alt="Listing Image"
          src={item.listing_img ? item.listing_img : "https://images.unsplash.com/photo-1674315411321-d65c2d07b850?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          width={640}
          height={480}
          style={{
            maxWidth: '100%',
            height: '250px',
            objectFit: 'cover',
          }}
        />
        <CardContent>
        <Typography gutterBottom component="div" variant='h6'>
            {item.product_name}
          </Typography>
          <Typography gutterBottom component="div">
            {truncatedDescr}
          </Typography>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" padding="8px 0px">
            <Box sx={{ border: '1px solid grey', padding: '4px 6px', borderRadius: '5px'}}>
              {Category[item.category_id]}
            </Box>
            <Typography variant="h6" color="text.secondary" fontWeight="fontWeightBold">
              {`$${item.price}`}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
