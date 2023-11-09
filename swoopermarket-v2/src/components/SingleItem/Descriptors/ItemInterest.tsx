import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

export default function ItemInterest({ seller } : { seller: string}) {
    return (
        <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<EditIcon/>}>Edit</Button>
            <Button variant="outlined" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<DeleteIcon/>}>Delete</Button>
            <Button variant="contained" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ShareIcon/>}>Share</Button>
        </Stack>
    );
}