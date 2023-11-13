import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DeleteModalProps } from "@/types/deleteModalProps";

const DeleteModal: React.FC<DeleteModalProps> = ({ handleDeleteModal, handleDelete, deleteType }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 3, backgroundColor: "white", borderRadius: 5 }}>
                <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                    <Typography variant="body1" color="black" sx={{ fontWeight: 'medium' }}>Delete {deleteType}</Typography>
                    <Typography variant="body1" color="gray">Delete your {deleteType} permanently?</Typography>
                    <Stack direction="row" spacing={3}>
                        <Button onClick={handleDeleteModal} sx={{ borderRadius: 50, width: "fit-content" }}>Cancel</Button>
                        <Button onClick={handleDelete} sx={{ borderRadius: 50, width: "fit-content" }}>Delete</Button>
                    </Stack>
                </Stack>
            </Box>
        </div>
    )
}

export default DeleteModal;