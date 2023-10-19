'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormHelperText from '@mui/material/FormHelperText';

interface NewUserForm {
    email: string;
    password: string;
    rePassword: string;
}

interface errors {
    email: string;
    rePassword: string;
}

export default function SignUp() {
    const [showPassword, setShowPassword] = React.useState(false); // hide/display password
    const [showRePassword, setShowRePassword] = React.useState(false); // 
    const [newUserForm, setNewUserForm] = React.useState<NewUserForm>({
        email: "",
        password: "",
        rePassword: "",
    })
    const [errors, setErrors] = React.useState<errors>({
        email: "",
        rePassword: "",
    })

    const onChangeEmail = (e: { target: { value: string; }; }) => {
        if (!e.target.value.match(".+@emory\.edu")) {
            setErrors({...errors, email: 'email must end in "@emory.edu"'})
        } else {
            setErrors({...errors, email: ''})
        }
        setNewUserForm({...newUserForm, email: e.target.value});
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onChangePassword = (e: { target: { value: string; }; }) => {
        setNewUserForm({...newUserForm, password: e.target.value});
    };

    const handleClickShowRePassword = () => setShowRePassword((show) => !show);
    const handleMouseDownRePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onChangeRePassword = (e: { target: { value: string; }; }) => {
        setNewUserForm({...newUserForm, rePassword: e.target.value});
        if (e.target.value !== newUserForm.password) {
            setErrors({...errors, rePassword: 'Passwords Do Not Match' })
        } else {
            setErrors({...errors, rePassword: ''})
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            SwooperMarket Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={errors.email !== ""}
                    helperText={errors.email}
                    value={newUserForm.email || ''}
                    onChange={ onChangeEmail }
                />
                </Grid>
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
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl required fullWidth variant="outlined">
                    <InputLabel htmlFor="re-password">Re-Enter Password</InputLabel>
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
            {(errors.rePassword || errors.email) ? 
                <Button
                    // type="submit"
                    disabled
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button> : 
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
            }
            <Grid container justifyContent="flex-end">
                <Grid item>
                <Link href="/login" style={{ textDecoration:"none" }}>
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </Box>
        </Box>
    </Container>
  );
}