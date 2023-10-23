'use client'

import React, { useState} from 'react';
import { Button, FormControl, Grid, InputAdornment, MenuItem, OutlinedInput, Paper, TextField, ThemeProvider, AppBar, Toolbar, createTheme, Typography, Box, Container} from '@mui/material';
import PreviewListing from './preview/page';

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
      price: data.get('price'),
      pickup: data.get('pickup')
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
    setShowPreview(true);
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
              <PreviewListing formData={formData} setShowPreview={setShowPreview} />
            </Paper>
          </div>
        )}
      </Paper>
      </Container>
    </>
  );
}