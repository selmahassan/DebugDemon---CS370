'use client'

import React, { useState} from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        name: 'John Doe',
        phone: '123-456-7890',
        bio: 'I am a user of this platform.',
        profilePicture: '',
        password: '',
        confirmPassword: '',
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // TODO: Make the api call to change the profile information
        // fetch('/api/editProfile', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(listing)
        // });

    };

    const handleProfilePictureChange = () => {
        // TODO: Make the api call to change the profile picture
    };

    return (
      <>
        <Container component="main" maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Button href="/profile" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ArrowBack/>}>Back to Profile</Button>
          <Paper elevation={0} sx={{ p: { xs: 2, md: 2 } }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <Typography variant="h4" sx={{ mb: 2 }}>Edit User Profile</Typography> {/* Added the title */}
                  </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </Grid>
                  <Grid item xs={12}>
                      <TextField
                          fullWidth
                          id="phone"
                          name="phone"
                          label="Phone Number"
                          value={formData.phone}
                          onChange={handleFormChange}
                      />
                  </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="bio"
                    name="bio"
                    label="Bio"
                    multiline
                    fullWidth
                    rows={4}
                    value={formData.bio}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="profilePicture">Change Profile Picture: </label>
                    <input
                        accept="image/*"
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        onChange={handleProfilePictureChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        required
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
                    />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disableElevation
                  >
                    Save Profile
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
    </>
  );
}



