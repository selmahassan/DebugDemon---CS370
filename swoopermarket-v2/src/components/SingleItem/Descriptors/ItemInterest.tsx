import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function ItemInterest({ seller } : { seller: string}) {
    return (
        <Stack direction="column" spacing={1.5}>
            <Button variant="contained" sx={{borderRadius: 50, width: "fit-content"}} href="#contained-buttons">{`Message ${seller}`}</Button>
            <Button variant="outlined" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<AddIcon/>}>Add to Watchlist</Button>
        </Stack>
    );
}