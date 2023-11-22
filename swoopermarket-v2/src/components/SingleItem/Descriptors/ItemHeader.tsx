import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function ItemHeader({ sold, title, seller, email, phone } : { sold: boolean, title: string; seller: string, email: string, phone: string }) {
    let status_text = "Available"
    if (sold) {
        status_text = "SOLD"
    }

    return (
        <Stack direction="column">
            <Typography variant="h4" color="initial">{title}</Typography>
            <Stack direction="row">
                <Typography variant="h6" color="initial" sx={{mr: 1}}>Status: </Typography>
                <Typography variant="h6" color={sold ? "error" : "primary"}>{status_text}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{mt: 1}}>
                <Typography variant="body1" color="initial">Seller: </Typography>
                <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
                <Typography variant="body1" color="initial">{seller}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{mt: 1}}>
                <Typography variant="body1" color="initial">Email: </Typography>
                <Typography variant="body1" color="initial">{email}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{mt: 1}}>
                <Typography variant="body1" color="initial">Phone Number: </Typography>
                <Typography variant="body1" color="initial">{phone}</Typography>
            </Stack>
        </Stack>
    );
}