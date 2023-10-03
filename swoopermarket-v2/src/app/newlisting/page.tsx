// 'use client'

// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { Button, TextField } from '@mui/material';
// import { Listing } from "src/types/listingType"

// export default function StarredPage() {

//   const handleSubmit = async (event: React.FormEventHandler<HTMLFormElement>) => {
//     console.log("handleSubmit reached");
  
//     // Gather form data
//     const formData = new FormData(event.arguments);

//     const listing = {
//       public get title() : string {
//         return 
//       }
      
//       title : formData.get('title') as string,
//       description: formData.get('description') as string,
//       price: parseFloat(formData.get('price') as string),
//     };
  
//     try {
//       const response = await fetch('../api/listing/route', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(listing),
//       });
  
//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Listing created:', responseData);
//       } else {
//         console.error('Error creating listing:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error creating listing:', error);
//     }
//   };  

//   return (
//     <Container>
//       <Typography variant="h5">Create a New Listing</Typography>

//       <Box component="form" onSubmit={handleSubmit}>

//         <TextField name="title" label="Title" />

//         <TextField name="description" label="Description" multiline rows={4} />

//         <TextField name="price" label="Price" type="number" />

//         <Button type="submit" variant="contained">
//           Submit
//         </Button>

//       </Box>
//     </Container>
//   );
// }


'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppBar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, MenuItem, Paper, TextField, ThemeProvider, Toolbar, createTheme } from '@mui/material';

export default function StarredPage() {

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
    event.preventDefault();
  
    // Gather form data
    const formData = new FormData(event.currentTarget);
    const listingData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string), // Parse price as a float
      // Add other fields as needed
    };
    console.log(listingData);
  
    try {
      const response = await fetch('../../api/route.ts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });
      console.log(response);
  
      if (response.ok) {
        // Handle success, e.g., show a success message or redirect to a confirmation page
        const responseData = await response.json();
        console.log('Listing created:', responseData);
      } else {
        // Handle the error case, e.g., show an error message to the user
        console.error('Error creating listing:', response.statusText);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error creating listing:', error);
    }
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
                id="title"
                name="title"
                label="Item Name"
                fullWidth
                variant="standard"
                sx={{mb: 3}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
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
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use default location"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
          >
            List Item
          </Button>
        </Box>
      </Paper>
      </Container>
    </>
  );
}