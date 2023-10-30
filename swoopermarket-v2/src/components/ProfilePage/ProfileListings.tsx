import { Typography, Grid } from "@mui/material";
import ListingCard from '@/components/HomePage/ListingCard';
import { ItemType } from "@/types/itemType";

const profileItems = [
    {
        listing_id: 7,
        product_name: "Pet Alligator",
        descr: "Generic Description",
        price: 48,
        listing_img: "/images/profileListings/alligator.jpg",
    },
    {
        listing_id: 8,
        product_name: "Shrink Ray Gun",
        descr: "Generic Description",
        price: 126,
        listing_img: "/images/profileListings/shrink ray gun.jpg",
    },
    {
        listing_id: 9,
        product_name: "Missile",
        descr: "Generic Description",
        price: 516,
        listing_img: "/images/profileListings/missle.jpg",
    },
];

export default function ProfileListings() {
    return (
        <div>
            <Typography sx={{ color: "#0033a0", padding: "10px 0px" }}>
                Results ({profileItems.length})
            </Typography>
            <Grid id="personal listings" container rowSpacing={3} columnSpacing={3}>
                {profileItems.map((item: ItemType) => (
                    <Grid key={item.listing_id} xs={12} sm={4} md={4}>
                        <ListingCard item={item}/>
                    </Grid>
                ))}
            </Grid>
            
        </div>
    );
}