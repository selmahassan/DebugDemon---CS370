'use client'

import { User } from '@/types/user';
import React, { useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ArrowBack from "@mui/icons-material/ArrowBack";
import StickyAlert from '@/components/StickyAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter, redirect } from 'next/navigation';
import DeleteModal from '@/components/DeleteModal';

export default function EditProfileForm({user}: {user: User}) {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userid, setUserid] = useState('0');
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user?.phone,
        profile_img: user?.profile_img,
        bio: user.bio,
    });

    useEffect(() => {
        // Retrieve user info from local storage
        const userInfo = localStorage.getItem('userInfo');
        let cookie_userid = "0"
        if (userInfo) {
            const cookie_user = JSON.parse(userInfo);
            cookie_userid = cookie_user.userid;
            setUserid(cookie_user.userid);
        }

        if (cookie_userid === "0") {
          // Redirect if user not logged in
          redirect(`/login`)
        }

        if(user.userid !== cookie_userid) {
            console.log("Cannot Edit Listing")
            redirect(`/profile/${user.userid}`)
        }
    }, []);

    // Edit profile in database  on submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const updated_user : User = {
            first_name: data.get('first_name') as string,
            last_name: data.get('last_name') as string,
            bio: data.get('bio') as string,
            phone: data.get('phone') as string,
            userid: userid,
            email: user.email,
            profile_img: null,
        };

        try {
            const response = await fetch('/api/user/' + user.userid, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated_user),
            });

            const result = await response.json();

            if (response.status === 200 || response.status === 201) {
                // Handle success
                setOpenError(false);
                router.push(`/profile/${user.userid}`)
              } else {
                // Handle errors
                setErrorMessage(result.message);
                setOpenError(true);
                setOpenSuccess(false);
              }

        } catch (error) {
            setErrorMessage('Error updating listing: ' + error);
            setOpenError(true);
            setOpenSuccess(false);
        }
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    // Delete profile on submit
    const handleDelete = async() => {
      let response = await fetch('../api/user/' + userid, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
      });
    
      if(response.status == 200 || response.status == 201) {
          setOpenSuccess(true);
          setOpenError(false);
          router.push('/login?isSuccessDelete=true');
      } else {
          setOpenSuccess(false)
          setOpenError(true)
      }
  }

    return (
      <>
        <Container component="main" maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
          <Button href={`/profile/${user.userid}`} sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ArrowBack/>}>Back to Profile</Button>
          <Paper elevation={0} sx={{ p: { xs: 2, md: 2 } }}>
            <StickyAlert
              successMessage="User profile changes saved!"
              errorMessage={errorMessage}
              openSuccess={openSuccess}
              setOpenSuccess={setOpenSuccess}
              openError={openError}
              setOpenError={setOpenError}
            />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <Typography variant="h4" sx={{ mb: 2 }}>Edit User Profile</Typography> {/* Added the title */}
                  </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    value={formData.first_name}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    value={formData.last_name}
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
                    label="Biography"
                    multiline
                    fullWidth
                    rows={4}
                    value={formData.bio}
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
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color='error'
                    sx={{borderRadius: 50, width: "fit-content"}} 
                    startIcon={<DeleteIcon/>} 
                    onClick={handleDeleteModal}
                    fullWidth
                  >
                    Delete Profile
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          {showDeleteModal &&
              <DeleteModal
                  handleDeleteModal={handleDeleteModal}
                  handleDelete={handleDelete}
                  deleteType="profile"
              />
          }
        </Container>
    </>
  );
}



