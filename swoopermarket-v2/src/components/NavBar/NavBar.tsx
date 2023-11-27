'use client'

import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const DRAWER_WIDTH = 240;

export default function NavBar() {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [mobileOpen, setMobileOpen] = useState(false); // Navbar display when on small screen device
    const [userId, setUserId] = useState("0");
    
    // Get user info from local storage
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setUserId(user.userid);
        }
    })

    const LINKS = [
        { text: 'Home', href: '/', icon: HomeIcon, id:1 },
        { text: 'New Listing', href: '/newlisting', icon: AddIcon, id:2 },
      ];
      
      const PLACEHOLDER_LINKS = [
        { text: 'Profile', href: `/profile/${userId}`, icon: ManageAccountsIcon, id:4 },
        { text: 'Logout', href: '/login', icon: LogoutIcon, id:5 },
      ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        try {
          await fetch('/api/logout', { method: 'POST' }); // Call the logout API
          localStorage.removeItem('userInfo'); // Clear user info from local storage
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

      const handleListItemClick = (index: number) => {
        if (index === 5) { // Assuming 5 is the id for Logout
          handleLogout();
        } else {
          setSelectedIndex(index);
        }
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
        <>
            <AppBar
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { sm: `${DRAWER_WIDTH}px` },
                }}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" sx={{color: "#0033a0", display: { sm: 'none' }}}>
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
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
                aria-label="nav bar"
            >
                <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                }}
                >
                {drawer}
                </Drawer>
                <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                }}
                open
                >
                {drawer}
                </Drawer>
            </Box>
        </>
    );
}


