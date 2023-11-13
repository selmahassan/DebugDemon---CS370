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

const avatarSize = 200;

const avatarImageStyle = {
  width: `${avatarSize}px`,
  height: `${avatarSize}px`,
};

type UserProfile = {
    name: string;
    email: string;
    // include other user properties as needed
  };

  const ProfilePage: React.FC<{ user: UserProfile }> = ({ user }) => {
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
          {/* Additional user info can be displayed here */}
        </Stack>
        <Button href="/newlisting" sx={{ borderRadius: 50, width: "fit-content" }} startIcon={<AddIcon />}>
          Create New Listing
        </Button>
        <ProfileListings />
      </div>
    </Box>
  );
};

export async function getServerSideProps(context): Promise<{ props: { user: UserProfile } } | { redirect: { destination: string, permanent: boolean } }> {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload; // JwtPayload is a type from 'jsonwebtoken'
    
    // Make sure to validate the existence of the properties
    if (typeof decoded.name === 'string' && typeof decoded.email === 'string') {
      const user: UserProfile = {
        name: decoded.name,
        email: decoded.email,
        // Assign other properties as needed
      };

      return { props: { user } };
    } else {
      // If the decoded token doesn't have the required fields, redirect to login
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
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
