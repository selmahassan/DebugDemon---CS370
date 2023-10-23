import { Typography, Grid } from '@mui/material';
import ListingCard from '@/components/HomePage/ListingCard';

const profileItems = [
    {
        id: 1,
        description: "Pet Alligator",
        price: 48,
        condition: "Like New",
        src: "/images/profileListings/alligator.jpg",
    },
    {
        id: 2,
        description: "Shrink Ray Gun",
        price: 126,
        condition: "Used",
        src: "/images/profileListings/shrink ray gun.jpg",
    },
    {
        id: 3,
        description: "Missile",
        price: 516,
        condition: "Used",
        src: "/images/profileListings/missle.jpg",
    }
];

export default function ProfileListings() {
    return (
        <div>
            <Typography sx={{ color: "#0033a0", padding: "10px 0px" }}>
                Results (3)
            </Typography>
            <br/>
            <Grid container columnSpacing={3} rowSpacing={3}>
                {profileItems.map((item) => (
                    <Grid key={item.id} xs={12} sm={6} md={4}>
                        <ListingCard item={item}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}