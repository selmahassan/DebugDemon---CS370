'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppBar, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, TextField, ThemeProvider, Toolbar, createTheme } from '@mui/material';

export default function StarredPage() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      description: data.get('description'),
      file: data.get('image'),
      category: data.get('category'),
      condition: data.get('condition'),
      price: data.get('price')
    });
  };

  // const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
  //   event.preventDefault();
  
  //   // Gather form data
  //   const formData = new FormData(event.currentTarget);
  //   const listingData = {
  //     title: formData.get('title') as string,
  //     description: formData.get('description') as string,
  //     price: parseFloat(formData.get('price') as string), // Parse price as a float
  //     // Add other fields as needed
  //   };
  //   console.log(listingData);
  
  //   try {
  //     const response = await fetch('../../api/route.ts', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(listingData),
  //     });
  //     console.log(response);
  
  //     if (response.ok) {
  //       // Handle success, e.g., show a success message or redirect to a confirmation page
  //       const responseData = await response.json();
  //       console.log('Listing created:', responseData);
  //     } else {
  //       // Handle the error case, e.g., show an error message to the user
  //       console.error('Error creating listing:', response.statusText);
  //     }
  //   } catch (error) {
  //     // Handle unexpected errors
  //     console.error('Error creating listing:', error);
  //   }
  // };  

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