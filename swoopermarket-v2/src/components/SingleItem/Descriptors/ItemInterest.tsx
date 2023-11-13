'use client'
import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteModal from '@/components/DeleteModal';

export default function ItemInterest() {
    {/* TODO: check if user is allowed to edit/delete */}
    const username = "my_username"
    const displayDeleteButton = username == "my_username" ? "" : "none";

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const handleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    // TODO: handle delete listing
    const handleDelete = () => {

    }

    return (
        <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" sx={{display: displayDeleteButton, borderRadius: 50, width: "fit-content"}} startIcon={<EditIcon/>}>Edit</Button>
            <Button variant="outlined" sx={{display: displayDeleteButton, borderRadius: 50, width: "fit-content"}} startIcon={<DeleteIcon/>} onClick={handleDeleteModal}>Delete</Button>
            <Button variant="contained" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ShareIcon/>}>Share</Button>
            {showDeleteModal &&
                <DeleteModal
                    handleDeleteModal={handleDeleteModal}
                    handleDelete={handleDelete}
                    deleteType="listing"
                />
            }
        </Stack>
    );
}