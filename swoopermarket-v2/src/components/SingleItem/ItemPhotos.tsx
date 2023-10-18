"use client"
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Image from "next/image";

let photoData = [
    {
        id: "",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c76e2119-acb7-4944-9085-d4f5ae2bda4a/go-flyease-easy-on-off-shoes-LGmqKx.png"
    },
    {
        id: "",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bbe6f776-12d9-43b3-a8d0-338a95180a0c/go-flyease-easy-on-off-shoes-LGmqKx.png"
    },
    {
        id: "",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0af510b3-6532-46c9-a315-95405e03ae52/go-flyease-easy-on-off-shoes-LGmqKx.png"
    },
    {
        id: "",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4face735-6dae-4db4-8456-99936374addf/go-flyease-easy-on-off-shoes-LGmqKx.png"
    }
]

export default function ItemPhotos() {
    const [selectedImg, setSelectedImg] = useState(photoData[0].src)
    
    return (
        <Grid container direction="row">
            <Grid container item direction="column" justifyContent="flex-start" alignItems="flex-start" xs={2}>
                {photoData.map(item => (
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