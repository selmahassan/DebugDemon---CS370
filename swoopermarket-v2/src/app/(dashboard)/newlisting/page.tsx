'use client'

import { Listing } from '@/types';
import React, { useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import createTheme from '@mui/material/styles/createTheme';
import ItemDescriptors from '@/components/SingleItem/ItemDescriptors';
import ItemPhotos from '@/components/SingleItem/ItemPhotos';
import CloseIcon from '@mui/icons-material/Close';
import StickyAlert from '@/components/StickyAlert';
import { useRouter } from 'next/router';
import { SpeakerPhone } from '@mui/icons-material';

  

export default function StarredPage() {

  const [email, setEmail] = useState('');
  const [userid, setUserid] = useState('');
  const [first_name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
      // Retrieve user info from local storage
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
          const user = JSON.parse(userInfo);
          setEmail(user.email); // Set the email in state
          setUserid(user.userid);
          setName(user.first_name);
          setPhone(user.phone);

      }
  }, []);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // ...existing category_id logic...

    // Retrieve userId from local storage set during the login

    if (!userid) {
      console.error('No user id found, please log in again');
      setOpenError(true);
      return;
    }

    const listing: Listing = {
      // Omit listingid, let the database handle ID creation
      title: data.get('title') as string,
      description: data.get('description') as string,
      category: Number(data.get('category')),
      condition: data.get('condition') as string,
      price: Number(data.get('price')),
      pickup: data.get('pickup') as string,
      userid: userid
    };

    console.log(listing);

    try {
      const response = await fetch('/api/listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle success
        setOpenSuccess(true);
        setOpenError(false);
       // router.push('/path-to-your-listing-page'); // Redirect to the listing page
      } else {
        // Handle errors
        console.error(result.message);
        setOpenError(true);
        setOpenSuccess(false);
      }
    } catch (error) {
      console.error('Error posting listing:', error);
      setOpenError(true);
      setOpenSuccess(false);
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
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 2 } }}>
          <Typography
            component="h1"
            variant="h4"
            // noWrap
            sx={{mb: 2}}
          >
            Create New Listing
          </Typography>
          <StickyAlert
            successMessage="You've successfully listed your item on SwooperMarket!"
            errorMessage="You cannot create a duplicate listing. Try Again."
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
                            SellerId: "1",
                            Name: first_name,
                            description: formData.description,
                            price: formData.price,
                            condition: formData.condition,
                            pickup: formData.pickup,
                            email: email,
                            phone: phone,
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
