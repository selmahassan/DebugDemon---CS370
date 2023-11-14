'use client'

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/navigation'

export default function RequireLogin() {
    const router = useRouter()
    const handleClick = () => {

        router.push('/login')
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 10, backgroundColor: "white", borderRadius: 5 }}>
                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                    <Typography variant="h5" color="black" sx={{ fontWeight: 'medium' }}>User Not Found</Typography>
                    <Typography variant="h6" color="gray">Please login to access your account.</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button onClick={handleClick} sx={{ width: "fit-content" }}>Login</Button>
                    </Stack>
                </Stack>
            </Box>
        </div>
    )
}