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
import { AppBar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, TextField, Toolbar } from '@mui/material';

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

  // return (
  //   <Container>
  //     <Typography variant="h5">Create a New Listing</Typography>

  //     <Box component="form" onSubmit={handleSubmit}>

  //       <TextField name="title" label="Title" />

  //       <TextField name="description" label="Description" multiline rows={4} />

  //       <TextField name="price" label="Price" type="number" />

  //       <Button type="submit" variant="contained">
  //         Submit
  //       </Button>

  //     </Box>
  //   </Container>
  // );
  return (
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 2 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create New Listing
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Title
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
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
  );
}