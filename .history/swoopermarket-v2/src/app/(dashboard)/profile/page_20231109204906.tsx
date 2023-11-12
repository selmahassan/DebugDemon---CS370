import Layout from "components/Layout";
import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Profile = ({ user }) => {
  // Use the user prop here
  const avatarSize = 200;

  const avatarImageStyle = {
    width: `${avatarSize}px`,
    height: `${avatarSize}px`,
  };

  return (
    <Layout title="Profile">
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
            <Rating name="read-only" defaultValue={1.5} precision={0.5} readOnly />
            <Typography variant="h4" color="initial">
              {user.name} {/* Display the name from the user prop */}
            </Typography>
            <Typography variant="body1" color="initial">
              Email: {user.email} {/* Display the email from the user prop */}
                    </Typography>
                    <Typography variant="body1" color="initial">
                        Phone: 123-456-7890
                    </Typography>
                </Stack>
                <Button href="/newlisting" sx={{ borderRadius: 50, width: "fit-content" }} startIcon={<AddIcon />}>
                    Create New Listing
                </Button>
            </div>
        </Box>
        </Layout>
    );
}