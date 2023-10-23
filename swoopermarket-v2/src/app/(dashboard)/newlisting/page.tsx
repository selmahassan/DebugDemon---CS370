'use client'
import { Listing } from "@/app/api/types/listingType";
import { POST } from "@/app/api/listing/route";
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppBar, Button, FormControl, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, TextField, ThemeProvider, Toolbar, createTheme } from '@mui/material';

export default function TasksPage() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const listing : Listing = {
      listingid: data.get('title') as string,
      title: data.get('title') as string,
      description: data.get('description') as string,
      image: data.get('image') as string,
      category: data.get('category') as string,
      condition: data.get('condition') as string,
      price: data.get('price') as string,
      pickup: data.get('pickup') as string,
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
        <AppBar position='absolute' elevation={0}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Upload Image
              </Typography>
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
                  id="price"
                  name="price"
                  startAdornment={<InputAdornment position="end">$</InputAdornment>}
                  aria-describedby="price"
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 2 }}
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
      </Paper>
      </Container>
    </>
  );
}