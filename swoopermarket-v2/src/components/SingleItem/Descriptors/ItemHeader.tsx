import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";

export default function ItemHeader({ title, seller } : { title: string; seller: string }) {
    return (
        <Stack direction="column">
            <Typography variant="h4" color="initial">{title}</Typography>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                <Typography variant="body1" color="initial">Seller: </Typography>
                <Avatar src={'src'} sx={{ width: 28, height: 28 }}/>
                <Link href={'href'} variant="body1">{seller}</Link>
            </Stack>
        </Stack>
    );
}