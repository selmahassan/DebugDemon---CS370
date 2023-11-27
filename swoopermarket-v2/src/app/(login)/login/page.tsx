'use client'

import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams} from 'next/navigation';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import StickyAlert from '@/components/StickyAlert';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('isSuccess');
  const isVerifySuccess = searchParams.get('isVerifySuccess');
  const isPasswordResetSuccess = searchParams.get('isPasswordResetSuccess');

  const [showPassword, setShowPassword] = React.useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // configure alerts
  useEffect(() => {
    if (isSuccess === 'true') {
      setOpenSuccess(true);
      setSuccessMessage("Account signup successful! Please check your email to sign in.");
    }
    if(isVerifySuccess === 'true'){
      setOpenSuccess(true);
      setSuccessMessage("Account verification successful! Please sign in.");
    }
    if(isPasswordResetSuccess == 'true'){
      setOpenSuccess(true);
      setSuccessMessage("Password reset successful! Please sign in with your new password.");
    }
  }, [isSuccess]);

  const verificationToken = searchParams.get('token')
  useEffect(() => {
    const verifyToken = async () => {
      if (verificationToken) {
        try {
          const response = await fetch(`/api/verify?token=${verificationToken}`);
          if (response.ok) {
            console.log('Verification Successful');
          } else {
            console.error('Failed to verify token');
          }
        } catch (error) {
          console.error('Error during token verification:', error);
        }
      }
    };

    verifyToken();
  }, [[verificationToken]])

  // Check valid login on submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await fetch('/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass: password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        localStorage.setItem('userInfo', JSON.stringify({
          userid: result.user.userid,
          first_name: result.user.first_name,
          last_name: result.user.last_name,
          email: result.user.email,
          phone: result.user.phone

        }));
        router.push('/'); // Redirect to the dashboard or appropriate route
      } else {
        // If login was not successful, handle accordingly
        setErrorMessage(result.message || 'Login failed.');
        setOpenError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login. Please try again.');
      setOpenError(true);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 15,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StickyAlert
            successMessage={successMessage}
            errorMessage={errorMessage}
            openSuccess={openSuccess}
            setOpenSuccess={setOpenSuccess}
            openError={openError}
            setOpenError={setOpenError}
          />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{color: "#0033a0", paddingTop: 1}}>
            Welcome to SwooperMarket
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl required fullWidth variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" style={{ textDecoration:"none" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" style={{ textDecoration:"none" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}