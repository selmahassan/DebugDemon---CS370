'use client'

import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const DRAWER_WIDTH = 240;

const LINKS = [
    { text: 'Home', href: '/', icon: HomeIcon, id:1 },
    { text: 'New Listing', href: '/newlisting', icon: AddIcon, id:2 },
  ];
  
  const PLACEHOLDER_LINKS = [
    { text: 'Profile', href: '/profile', icon: ManageAccountsIcon, id:4 },
    { text: 'Logout', href: '/login', icon: LogoutIcon, id:5 },
  ];

export default function NavBar() {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleListItemClick = (
        index: number,
      ) => {
        setSelectedIndex(index);
      };
    
    const drawer = (
        <>
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                <Typography variant="h5" sx={{color: "#0033a0", paddingTop: 1}}>
                    <Link 
                        href="/" 
                        style={{
                            textDecoration:"none", 
                            fontWeight:'bold',
                        }}
                    >
                        SwooperMarket
                    </Link>
                </Typography>
            </Box>
            <List>
                {LINKS.map(({ text, href, icon: Icon, id }) => (
                <ListItem key={href} disablePadding sx={{fontWeight: 'fontWeightBold', p:1}}>
                    <ListItemButton 
                        component={Link} 
                        href={href} 
                        selected={selectedIndex === id}
                        onClick={() => handleListItemClick(id)}
                        sx={{borderRadius: 2, p:1.5}}
                    >
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 'auto' }} />
            <List>
                {PLACEHOLDER_LINKS.map(({ text, href, icon: Icon, id }) => (
                <ListItem key={href} disablePadding sx={{fontWeight: 'fontWeightBold', p:1}}>
                    <ListItemButton 
                        component={Link} 
                        href={href} 
                        selected={selectedIndex === id}
                        onClick={() => handleListItemClick(id)}
                        sx={{borderRadius: 2}}
                    >
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </>
    )

    return (
            // <Box
            //     component="nav"
            //     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            //     aria-label="nav bar"
            // >
            //     <Drawer
            //     container={container}
            //     variant="temporary"
            //     open={mobileOpen}
            //     onClose={handleDrawerToggle}
            //     ModalProps={{
            //         keepMounted: true, // Better open performance on mobile.
            //     }}
            //     sx={{
            //         display: { xs: 'block', sm: 'none' },
            //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            //     }}
            //     >
            //     {drawer}
            //     </Drawer>
            //     <Drawer
            //     variant="permanent"
            //     sx={{
            //         display: { xs: 'none', sm: 'block' },
            //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            //     }}
            //     open
            //     >
            //     {drawer}
            //     </Drawer>
            // </Box>



        <Drawer
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                height: 'auto',
                bottom: 0,
                bgcolor: 'background.default',
                },
            }}
            open
            variant="permanent"
            anchor="left"
        >
            {drawer}
        </Drawer>
    );
}

