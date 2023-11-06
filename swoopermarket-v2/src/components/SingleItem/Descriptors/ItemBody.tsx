import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ItemBody({ description, price, condition, pickup } : { description: string; price: number; condition: string; pickup: string }) {
    return (
        <Stack direction="column" spacing={1.5}>
            <Stack direction="column">
                <Typography variant="body1" color="initial">Description:</Typography>
                <Typography variant="body1" color="initial">{description}</Typography>
            </Stack>
            <Typography variant="body1" color="initial">{`Price: $${price}`}</Typography>
            <Typography variant="body1" color="initial">{`Condition: ${condition}`}</Typography>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} >
                {/* TODO: add space after "pickup" */}
                <Typography variant="body1" color="initial">Preferred Pickup: </Typography>
                <Typography variant="body1" color="initial">{pickup}</Typography>
            </Stack>
        </Stack>
    );
}