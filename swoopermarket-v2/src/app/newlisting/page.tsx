'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';

export default function StarredPage() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Gather form data
    const formData = new FormData(event.currentTarget);
    const listingData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string), // Parse price as a float
      // Add other fields as needed
    };
  
    try {
      const response = await fetch('/api/newlisting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });
  
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

  return (
    <Container>
      <Typography variant="h5">Create a New Listing</Typography>

      <Box component="form" onSubmit={handleSubmit}>

        <TextField name="title" label="Title" />

        <TextField name="description" label="Description" multiline rows={4} />

        <TextField name="price" label="Price" type="number" />

        <Button type="submit" variant="contained">
          Submit
        </Button>

      </Box>
    </Container>
  );
}
