import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function ItemBody({ description, price, condition, pickup } : { description: string; price: number; condition: string; pickup: string }) {
    return (
        <Stack direction="column" spacing={1.5}>
            <Stack direction="column">
                <Typography variant="body1" color="initial">Description:</Typography>
                <Typography variant="body1" color="initial">{description}</Typography>
            </Stack>
            <Typography variant="body1" color="initial">{`Price: $${price}`}</Typography>
            <Typography variant="body1" color="initial">{`Condition: ${condition}`}</Typography>
            <Stack direction="row">
                {/* TODO: add space after "pickup" */}
                <Typography variant="body1" color="initial">Pickup: </Typography>
                <Link href={'href'} variant="body1">{pickup}</Link>
            </Stack>
        </Stack>
    );
}