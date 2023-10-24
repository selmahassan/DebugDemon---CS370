'use client'
import { useState } from "react";
import Grid from "@mui/material/Grid";

type PhotoType = {
    id: string;
    src: string;
};

export default function ItemPhotos({ photos } : { photos: PhotoType[] }) {
    const [selectedImg, setSelectedImg] = useState(photos[0].src);
    const [lastClickedIndex, setLastClickedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(0);
    
    return (
        <Grid container direction="row">
            <Grid container item direction="column" justifyContent="flex-start" alignItems="flex-start" xs={2}>
                {photos.map((item, index) => (
                    <Grid item
                        key=""
                        onClick={()=> {
                            setSelectedImg(item.src);
                            setLastClickedIndex(index);
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(lastClickedIndex)} 
                    >
                        {/* TODO: add hover effect */}
                        <img
                            src={item.src}
                            width='100vw'
                            height='100vw'
                            style={{
                                maxWidth: '100%',
                                objectFit: 'cover',
                                cursor:'pointer',
                                transition: "border 0.25s ease",
                                border: isHovered === index ? "3px solid #42a5f5" : "none"
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