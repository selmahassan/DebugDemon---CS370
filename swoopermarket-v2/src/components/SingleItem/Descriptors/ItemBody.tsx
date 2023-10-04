import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function ItemBody() {
    return (
        <Stack direction="column" spacing={1.5}>
            <Stack direction="column">
                <Typography variant="body1" color="initial">Description:</Typography>
                <Typography variant="body1" color="initial">{'I am selling brand new size 12 men’s Nike Go FlyEase shoes at a discounted price. These shoes can easily be put on/off without reaching down. There is nothing wrong with these shoes, just too small for me.'}</Typography>
            </Stack>
            <Typography variant="body1" color="initial">{'Price: $' + '75'}</Typography>
            <Typography variant="body1" color="initial">{'Condition: ' + 'New'}</Typography>
            <Stack direction="row">
                <Typography variant="body1" color="initial">Pickup: </Typography>
                <Link href={'href'} variant="body1">{'Dobbs Hall Main Lobby'}</Link>
            </Stack>
            <Typography variant="body1" color="initial">{'Price: $' + '75'}</Typography>
        </Stack>
    );
}