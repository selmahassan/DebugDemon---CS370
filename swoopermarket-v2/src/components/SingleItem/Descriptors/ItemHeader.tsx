import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";

export default function ItemHeader({ title, seller, email, phone, userid } : { title: string; seller: string, email: string, phone: string, userid:string }) {
    return (
        <Stack direction="column">
            <Typography variant="h4" color="initial">{title}</Typography>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{mt: 1}}>
                <Typography variant="body1" color="initial">Seller: </Typography>
                <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
                <Link href={`/profile/ + ${userid}`}>
                    <Typography variant="body1" color="initial">{seller}</Typography>
                </Link>
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