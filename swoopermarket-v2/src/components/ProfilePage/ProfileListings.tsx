import { Button, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { ItemType } from "@/types/itemType";
import AddIcon from '@mui/icons-material/Add';

export default function ProfileListings({listings} : {listings: Array<any>}) {
    return (
        <>
            <Stack direction="row" spacing={2}>
                <Typography sx={{ color: "#0033a0", padding: "5px 0px" }}>
                    Results ({listings.length})
                </Typography>
                <Button href="/newlisting" sx={{ borderRadius: 25, width: "fit-content" }} startIcon={<AddIcon />}>
                    Create New Listing
                </Button>
            </Stack>  
            <Grid id="personal listings" alignItems="center" container rowSpacing={3} columnSpacing={3} >
                {listings.map((item: ItemType) => (
                    <Grid key={item.listing_id} xs={12} sm={4} md={4}>
                        <ListingCard item={item}/>
                    </Grid>
                ))}
            </Grid>
            
        </>
    );
}