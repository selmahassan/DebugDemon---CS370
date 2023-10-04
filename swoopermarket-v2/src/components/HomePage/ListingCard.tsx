import * as React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid/Grid';
import Box from '@mui/system/Box';

export default function SingleItem({ description, price, href, condition, src }: { description: string; price: string; href: string; condition: string; src: string }) {
  return (
    <Card>
      {/* TODO: add different links for different cards */}
      <CardActionArea href="/singleitem">
        <Image
          alt="Listing Image"
          src={src}
          width={640}
          height={480}
          style={{
            maxWidth: '100%',
            height: '200px',
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {description}
          </Typography>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" padding="8px 0px">
            <Box sx={{ border: '1px solid grey', padding: '4px 6px', borderRadius: '5px'}}>
              {condition}
            </Box>
            <Typography variant="h6" color="text.secondary" fontWeight="fontWeightBold">
              {price}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
