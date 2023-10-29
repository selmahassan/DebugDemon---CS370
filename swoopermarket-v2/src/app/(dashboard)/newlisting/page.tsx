'use client'

import { Listing } from '@/types';
import React, { useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';
import ItemPhotos from '@/components/SingleItem/ItemPhotos';
import CloseIcon from '@mui/icons-material/Close';

export default function StarredPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const listing : Listing = {
      listingid: Date.now as unknown as number,
      title: data.get('title') as string,
      description: data.get('description') as string,
      category: data.get('category') as string,
      condition: data.get('condition') as string,
      price: data.get('price') as unknown as number,
    };

    fetch('/api/listing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listing)
    });
    
  };

  const theme = createTheme({
    components: {
        MuiToolbar: {
            styleOverrides: {
                dense: {
                    height: 75,
                    minHeight: 50
                }
            }
        }
    },
  })

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    price: 0,
    pickup: '',
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handlePreviewClick = () => {
    setShowPreview(!showPreview);
  };

  const categories = [
    {
      key: 'school_supplies',
      text: 'School Supplies',
    },
    {
      key: 'furniture',
      text: 'Furniture',
    },
    {
      key: 'electronics',
      text: 'Electronics',
    },
    {
      key: 'misc',
      text: 'Other/Miscellaneous',
    },
  ];

  const condition = [
    {
      key: 'brand_new',
      text: 'Brand New',
    },
    {
      key: 'like_new',
      text: 'Like New',
    },
    {
      key: 'good',
      text: 'Good',
    },
    {
      key: 'fair',
      text: 'Fair',
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar elevation={0}>
            <Toolbar variant="dense" sx={{ pr: '24px', backgroundColor: '#f2a900' }} >
              <Typography
                component="h1"
                variant="h4"
                color="inherit"
                noWrap
                sx={{ marginLeft: '240px'}}
              >
                Create New Listing
              </Typography>
            </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 10 }}>
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 2 } }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Item Description"
                multiline
                fullWidth
                rows={4}
                value={formData.description}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Upload Image
              </Typography>
              {/* TODO: option to add multiple images */}
              <TextField
                required
                type="file"
                id="image"
                name="image"
                sx={{mb: 1}}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{mb:-2}}>
                Item Specifics
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="category"
                name="category"
                select
                required
                fullWidth
                label="Item Category"
                value={formData.category}
                onChange={handleFormChange}
              >
                {categories.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  id="condition"
                  name="condition"
                  select
                  required
                  fullWidth
                  label="Item Condition"
                  value={formData.condition}
                  onChange={handleFormChange}
                >
                  {condition.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.text}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{mb:-2}}>
                Pricing
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined">
                <OutlinedInput
                  type="number"
                  id="price"
                  name="price"
                  startAdornment={<InputAdornment position="end">$</InputAdornment>}
                  aria-describedby="price"
                  value={formData.price}
                  onChange={handleFormChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{mb:-2}}>
                Pickup Location
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="pickup"
                name="pickup"
                value={formData.pickup}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 2 }}
                onClick={handlePreviewClick}
              >
                Preview Listing
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 2 }}
              >
                List Item
              </Button>
            </Grid>
          </Grid>
        </Box>
        {showPreview && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
            <Paper>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 3}}>
                <div>
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Button onClick={handlePreviewClick} sx={{borderRadius: 50, width: "fit-content"}} startIcon={<CloseIcon/>}>Close Preview</Button>
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
            </Paper>
          </div>
        )}
      </Paper>
      </Container>
    </>
  );
}