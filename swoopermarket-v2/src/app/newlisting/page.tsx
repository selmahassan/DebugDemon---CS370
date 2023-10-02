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
import { AppBar, Button, CssBaseline, Paper, TextField, Toolbar } from '@mui/material';
import Form from '@/components/NewListing/Form';

export default function StarredPage() {

  const handleSubmit = async (event: HTMLFormElement) => {
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
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 2 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create New Listing
          </Typography>
          <Form/>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}