'use client'

import { Listing } from '@/types/listing';
import React, { useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import StickyAlert from '@/components/StickyAlert';
import type { PutBlobResult } from '@vercel/blob';
import { useRouter } from 'next/navigation';
import { Category_Num } from '@/enums/category';
import { redirect } from 'next/navigation'

export default function StarredPage() {
  const [userid, setUserid] = useState('');
  const [image, setImage] = useState('')
  const [errorImage, setErrorImage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    price: 0,
    pickup: '',
  });

  useEffect(() => {
      // Retrieve user info from local storage
      const userInfo = localStorage.getItem('userInfo');
      let cookie_userid = "0"
      if (userInfo) {
          const user = JSON.parse(userInfo);
          cookie_userid = user.userid;
          setUserid(user.userid);
      }
      if (cookie_userid === "0") {
        // redirect if user not logged in
        redirect(`/login`)
      }
  }, []);

  // post image file to blob storage
  const submitBlob = async(image: File) => {
    try {
      const response = await fetch(
        `/api/images?filename=${image.name}`,
        {
          method: 'POST',
          body: image,
        },
      );
  
      const newBlob = (await response.json()) as PutBlobResult;
      return newBlob.url
    } catch (error) {
      return null
    }
  }

  // post new listing to postgres database on form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
        
    if (!userid) {
      setErrorMessage('No user id found, please log in again');
      setOpenError(true);
      return;
    }

    let category = data.get('category') as string
    let category_id: number = Category_Num.indexOf(category)
    if (category_id === -1) {
      category_id = 4
    }

    let image = data.get('image') as File 

    const image_url = await submitBlob(image)

    const listing: Listing = {
      title: data.get('title') as string,
      description: data.get('description') as string,
      category: category_id,
      condition: data.get('condition') as string,
      price: Number(data.get('price')),
      pickup: data.get('pickup') as string,
      image: image_url as string,
      userid: userid,
      sold: false,
    };

    try {
      const response = await fetch('/api/listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });

      const result = await response.json();

      if (response.status === 200 || response.status === 201) {
        // Handle success
        setOpenError(false);
        router.push('/profile/' + userid + '?isSuccessNewListing=true'); // Redirect to the listing page
      } else {
        // Handle error status
        setErrorMessage(result.message);
        setOpenError(true);
        setOpenSuccess(false);
      }
    } catch (error) {
      setErrorMessage('Error posting listing: ' + error);
      setOpenError(true);
      setOpenSuccess(false);
    }
  };

  // set formData state
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  // Check for file upload errors
  const onChangeImage = (event: { target: { files?: any; name?: any; value?: any; }; }) => {
    setImage('')
    const file_values = event.target.files[0]
    if(file_values.type.split("/")[0] !== "image") {
      setErrorImage("Invalid File: File must be an image (e.g., jpeg, png, avif)")
    } else if(file_values.size > 4.5e6) {
      setErrorImage("Invalid File: File must be < 4.5 MB")
    } else {
      setErrorImage('')
      const {value} = event.target;
      setImage(value)
    }
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
      key: 'tickers',
      text: 'Tickets',
    },
    {
      key: 'housing',
      text: 'Housing',
    },
    {
      key: 'books',
      text: 'Books',
    },
    {
      key: 'other',
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
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 2 } }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{mb: 2}}
          >
            Create New Listing
          </Typography>
          <StickyAlert
            successMessage="You've successfully listed your item on SwooperMarket!"
            errorMessage={errorMessage}
            openSuccess={openSuccess}
            setOpenSuccess={setOpenSuccess}
            openError={openError}
            setOpenError={setOpenError}
          />
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
                <TextField
                  required
                  type="file"
                  id="image"
                  name="image"
                  sx={{mb: 1}}
                  value={image}
                  onChange={onChangeImage}
                  error={errorImage !== ''}
                  helperText={errorImage}
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
              <Grid item xs={12}>
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
