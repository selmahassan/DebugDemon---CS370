'use client'

import Grid from "@mui/material/Grid";
import Image from 'next/image';

type PhotoType = {
    id: string;
    src: string;
};

export default function ItemPhotos({ photos } : { photos: PhotoType[] }) {
    let current_photos = []
    if (photos.length === 0) {
        current_photos.push({
            id: "1",
            src: "https://images.unsplash.com/photo-1674315411321-d65c2d07b850?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        })
    } else {
        current_photos = photos
    }
    
    return (
        <Grid container direction="row">
            <Grid item xs={10}>
                <Image
                    alt="Listing Image"
                    src={current_photos[0].src}
                    width={500}
                    height={500}
                    style={{
                        maxWidth: '100%',
                        objectFit: 'cover',
                    }}
                    loading='lazy'
                />
            </Grid>
        </Grid>
    );
}