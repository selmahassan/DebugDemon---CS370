// src/app/(dashboard)/profile/page.tsx
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ProfileListings from "@/components/ProfilePage/ProfileListings"; // Adjust import path as necessary
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Define the TypeScript interface for the user prop
interface User {
  name: string;
  email: string;
}

const avatarSize = 200;

const ProfilePage: React.FC<{ user: User }> = ({ user }) => {
      
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Stack direction="column" spacing={1} alignItems="center">
        <Avatar alt="Profile Picture" src="/images/avatar/gru.jpg" sx={{ width: avatarSize, height: avatarSize }} />
        <Tooltip title="Edit Profile">
          <IconButton href="/editProfile">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" color="initial">
          {user.name} {/* Display the name from the user prop */}
        </Typography>
        <Typography variant="body1" color="initial">
          Email: {user.email} {/* Display the email from the user prop */}
        </Typography>
        {/* Additional user information can be added here */}
      </Stack>
      <Button href="/newlisting" sx={{ borderRadius: 50, width: "fit-content" }} startIcon={<AddIcon />}>
        Create New Listing
      </Button>
      <ProfileListings />
    </Box>
  );
};

export default ProfilePage;

