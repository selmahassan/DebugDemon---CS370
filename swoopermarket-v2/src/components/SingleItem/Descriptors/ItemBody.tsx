import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Condition } from '@/enums/condition';

export default function ItemBody({ description, price, condition, pickup } : { description: string; price: number; condition: string; pickup: string }) {
    let item_condition = "none"
    switch(condition) {
        case "brand_new":
            item_condition = "New"
            break;
        case "like_new":
            item_condition = "Like New"
            break;
        case "good":
            item_condition = "Good"
            break;
        case "fair":
            item_condition = "Fair"
            break;
    }
    return (
        <Stack direction="column" spacing={1.5}>
            <Stack direction="column">
                <Typography variant="body1" color="initial">Description:</Typography>
                <Typography variant="body1" color="initial">{description}</Typography>
            </Stack>
            <Typography variant="body1" color="initial">{`Price: $${price}`}</Typography>
            <Typography variant="body1" color="initial">{`Condition: ${item_condition}`}</Typography>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} >
                <Typography variant="body1" color="initial">Preferred Pickup: </Typography>
                <Typography variant="body1" color="initial">{pickup}</Typography>
            </Stack>
        </Stack>
    );
}