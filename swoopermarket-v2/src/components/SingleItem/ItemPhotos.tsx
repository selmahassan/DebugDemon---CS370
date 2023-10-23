"use client"
import { useState } from "react";
import Grid from "@mui/material/Grid";

type PhotoType = {
    id: string;
    src: string;
};

export default function ItemPhotos({ photos } : { photos: PhotoType[] }) {
    const [selectedImg, setSelectedImg] = useState(photos[0].src)
    
    return (
        <Grid container direction="row">
            <Grid container item direction="column" justifyContent="flex-start" alignItems="flex-start" xs={2}>
                {photos.map(item => (
                    <Grid item key="" onClick={()=> {setSelectedImg(item.src)}}>
                        {/* TODO: add hover effect */}
                        <img
                            src={item.src}
                            width='100vw'
                            height='100vw'
                            style={{
                                maxWidth: '100%',
                                objectFit: 'cover'
                            }}
                            loading='lazy'
                        />
                    </Grid>
                ))}
            </Grid>
            {/* TODO: verticle photo selector and main photo overlap on smaller screens*/}
            <Grid item xs={10}>
                <img
                    src={selectedImg}
                    width='100%'
                    // TODO: fix height
                    height='500px'
                    style={{
                        maxWidth: '100%',
                        objectFit: 'cover'
                    }}
                    loading='lazy'
                />
            </Grid>
        </Grid>
    );
}