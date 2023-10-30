import { Typography, Grid } from "@mui/material";
import ListingCard from '@/components/HomePage/ListingCard';

const profileItems = [
    {
        listing_id: 7,
        product_name: "Pet Alligator",
        description: "Generic Description",
        price: 48,
        condition: "Like New",
        listing_img: "/images/profileListings/alligator.jpg",
    },
    {
        listing_id: 8,
        product_name: "Shrink Ray Gun",
        description: "Generic Description",
        price: 126,
        condition: "Used",
        listing_img: "/images/profileListings/shrink ray gun.jpg",
    },
    {
        listing_id: 9,
        product_name: "Missile",
        description: "Generic Description",
        price: 516,
        condition: "Used",
        listing_img: "/images/profileListings/missle.jpg",
    },
];

export default function ProfileListings() {
    return (
        <div>
            <Typography sx={{ color: "#0033a0", padding: "10px 0px" }}>
                Results (3)
            </Typography>
            <Grid container spacing={3}>
                {profileItems.map((item) => (
                    <Grid key={item.id} item xs={6} sm={4} md={4}>
                        <ListingCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}