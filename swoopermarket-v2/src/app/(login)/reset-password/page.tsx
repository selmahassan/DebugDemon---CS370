'use client'

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import StickyAlert from '@/components/StickyAlert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormHelperText from '@mui/material/FormHelperText';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface NewUserForm {
    password: string;
    rePassword: string;
}

interface errors {
    password: string;
    rePassword: string;
}

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const passwordResetToken = searchParams.get('token')

  const [showPassword, setShowPassword] = React.useState(false); // hide/display password
  const [showRePassword, setShowRePassword] = React.useState(false);
  const [newUserForm, setNewUserForm] = React.useState<NewUserForm>({
    password: "",
    rePassword: "",
  })
  
  const [errors, setErrors] = React.useState<errors>({
    password: "",
    rePassword: ""
  })

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };

  const onChangePassword = (e: { target: { value: string; }; }) => {
      setNewUserForm({...newUserForm, password: e.target.value});
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if(!passwordRegex.test(e.target.value)){
        setErrors({...errors, password: 'Passwords must have at least 8 characters, 1 lowercase, 1 uppercase, and 1 number.' })
      } else {
        setErrors({...errors, password: ''})
      }
  };

  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleMouseDownRePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };

  const onChangeRePassword = (e: { target: { value: string; }; }) => {
      setNewUserForm({...newUserForm, rePassword: e.target.value});
      if (e.target.value !== newUserForm.password) {
          setErrors({...errors, rePassword: 'Passwords do not match.' })
      } else {
          setErrors({...errors, rePassword: ''})
      }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPassword = data.get('password');

    if(passwordResetToken) {
      try {
        const response = await fetch(`/api/forgotpassword?token=${passwordResetToken}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword }),
        });
        const result = await response.json();
    
        if (response.status === 200) {
          router.push('/login?isPasswordResetSuccess=true');
        } else {
          setErrorMessage(result.message);
          setOpenError(true);
        }
      } catch (error) {
        console.error('Password reset error:', error);
        setErrorMessage('An error occurred while resetting your password. Please try again.');
        setOpenError(true);
      }
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
            my: 25,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StickyAlert
            successMessage="Password reset successful! Please log in."
            errorMessage={errorMessage}
            openSuccess={openSuccess}
            setOpenSuccess={setOpenSuccess}
            openError={openError}
            setOpenError={setOpenError}
          />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Typography component="h5" variant="body2" align='center'>
            {passwordResetToken ? "Enter a new password below to change your password." : "Cannot access page without a valid password reset token."}
          </Typography>
          { passwordResetToken && <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                                value={newUserForm.password || ''}
                                onChange={ onChangePassword }
                            />
                            {errors.password !== "" && (
                                <FormHelperText error id="password-error">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl required fullWidth variant="outlined">
                            <InputLabel htmlFor="re-password">Confirm</InputLabel>
                            <OutlinedInput
                                id="rePassword"
                                name="rePassword"
                                type={showRePassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowRePassword}
                                    onMouseDown={handleMouseDownRePassword}
                                    edge="end"
                                    >
                                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="rePassword"
                                value={newUserForm.rePassword || ''}
                                onChange={ onChangeRePassword }
                                error={errors.rePassword !== ""}
                            />
                            {errors.rePassword !== "" && (
                                <FormHelperText error id="rePassword-error">
                                    {errors.rePassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset My Password
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/login" style={{ textDecoration:"none" }}>
                  {"Return to Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>}
        </Box>
      </Grid>
    </Grid>
  );
}