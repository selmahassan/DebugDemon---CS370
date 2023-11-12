import * as React from 'react';
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ProfileListings from "@/components/ProfilePage/ProfileListings";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Define the expected structure of the JWT payload
interface UserPayload extends JwtPayload {
  firstName?: string;
  email?: string;
}

interface ProfilePageProps {
  user: UserPayload | null;
}

const avatarSize = 200;

const avatarImageStyle = {
    width: `${avatarSize}px`,
    height: `${avatarSize}px`,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;
    const { token } = parse(req.headers.cookie || '');
    
    if (!token) {
      return { props: { user: null } };
    }
    
    let user: UserPayload | null = null;
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload;
      user = decoded;
    } catch (err) {
      console.error(err);
      // You might want to redirect to login or show an error here
    }
    
    return { props: { user } };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
    if (!user) {
      return <div>Please log in to view this page.</div>;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* ... */}
            <Typography variant="h4" color="initial">
                {user.firstName || 'Gru'}
            </Typography>
            <Typography variant="body1" color="initial">
                Email: {user.email || 'iWantToStealTheMoon@minions.com'}
            </Typography>
            {/* ... */}
        </Box>
    );
}

export default ProfilePage;

