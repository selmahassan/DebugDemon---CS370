import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function ItemInterest() {
    return (
        <Stack direction="column" spacing={1.5}>
            <Button variant="contained" href="#contained-buttons">{'Message ' + 'Michael Jordan'}</Button>
            <Button variant="outlined" startIcon={<AddIcon/>}>Delete</Button>
        </Stack>
    );
}