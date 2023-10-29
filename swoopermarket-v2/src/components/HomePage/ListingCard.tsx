import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Box from '@mui/system/Box';
import { ItemType } from '@/types/itemType';

export default function ListingCard({ item }: { item: ItemType }) {
  return (
    <Card>
      <CardActionArea href={`/singleitem/${item.id}`}>
        {/* <Image
          alt="Listing Image"
          src={item.src}
          width={640}
          height={480}
          style={{
            maxWidth: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        /> */}
        <CardContent>
          <Typography gutterBottom component="div">
            {item.desc}
          </Typography>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" padding="8px 0px">
            {/* <Box sx={{ border: '1px solid grey', padding: '4px 6px', borderRadius: '5px'}}>
              {item.condition}
            </Box> */}
            <Typography variant="h6" color="text.secondary" fontWeight="fontWeightBold">
              {`$${item.price}`}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
