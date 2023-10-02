import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MediaCard from '@/components/MediaCard';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
      <div>
        <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
          <Typography variant="h5" sx={{color: "#0033a0", paddingTop: 1}}>
            <Link 
                href="/" 
                style={{
                    textDecoration:"none", 
                    fontWeight:'bold',
                }}
            >
                SwooperMarket
            </Link>
          </Typography>
          <SearchBar placeHolderText="Search SwooperMarket"/>
        </Grid>
        <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading="CMYK"
              text="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="HSL and HSV"
              text="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="RGB"
              text="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="CIELAB"
              text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
