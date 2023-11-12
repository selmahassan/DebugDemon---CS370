// src/app/profile/page.tsx
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ProfileListings from "@/components/ProfilePage/ProfileListings"; // Ensure the path is correct
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import { GetServerSideProps } from 'next';

const avatarSize = 200;
const avatarImageStyle = {
  width: `${avatarSize}px`,
  height: `${avatarSize}px`,
};

interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

const ProfilePage: React.FC<{ user: JwtPayload }> = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <div>
        <Stack direction="column" spacing={1} alignItems="center">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Avatar alt="Profile Picture" src="/images/avatar/gru.jpg" sx={avatarImageStyle} />
          </div>
          <Tooltip title="Edit Profile">
            <IconButton href="/editProfile">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Rating name="read-only" value={5} readOnly />
          <Typography variant="h4" color="initial">
            {user.name} {/* Display the name from the user prop */}
          </Typography>
          <Typography variant="body1" color="initial">
            Email: {user.email} {/* Display the email from the user prop */}
          </Typography>
          {/* You can add more user details here if needed */}
        </Stack>
        <Button href="/newlisting" sx={{ borderRadius: 50, width: "fit-content" }} startIcon={<AddIcon />}>
          Create New Listing
        </Button>
        <ProfileListings />
      </div>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const token = cookies.token; // Adjust this to the actual token name

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
    return { props: { user: decoded } };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default ProfilePage;
