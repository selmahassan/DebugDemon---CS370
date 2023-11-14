'use client'
import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import DeleteModal from '@/components/DeleteModal';
import StickyAlert from '@/components/StickyAlert';
import { useRouter } from 'next/navigation';

export default function ItemInterest({ listingId } : { listingId: string}) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/editListing/${listingId}`)
    }

    {/* TODO: check if user is allowed to edit/delete */}
    const username = "my_username"
    const displayDeleteButton = username == "my_username" ? "" : "none";

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    const handleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const handleDelete = async() => {
        let response = await fetch('../api/listing/' + listingId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
        });
      
        if(response.status == 200 || response.status == 201) {
            setOpenSuccess(true);
            setOpenError(false);
            router.push('/?isSuccessDelete=true');
        } else {
            setOpenSuccess(false)
            setOpenError(true)
        }
    }

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setOpenSuccess(true);
    };

    return (
        <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" sx={{display: displayDeleteButton, borderRadius: 50, width: "fit-content"}} startIcon={<EditIcon/>} onClick={handleEdit}>Edit</Button>
            <Button variant="outlined" sx={{display: displayDeleteButton, borderRadius: 50, width: "fit-content"}} startIcon={<DeleteIcon/>} onClick={handleDeleteModal}>Delete</Button>
            <Button variant="contained" sx={{borderRadius: 50, width: "fit-content"}} startIcon={<ShareIcon/>} onClick={handleShare}>Share</Button>
            {showDeleteModal &&
                <DeleteModal
                    handleDeleteModal={handleDeleteModal}
                    handleDelete={handleDelete}
                    deleteType="listing"
                />
            }
            <StickyAlert
                successMessage="Link copied to clipboard!"
                errorMessage="Listing could not be deleted"
                openSuccess={openSuccess}
                setOpenSuccess={setOpenSuccess}
                openError={openError}
                setOpenError={setOpenError}
            />
        </Stack>
    );
}