import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography } from '@mui/material';

// TODO: Connect to the database to get real listings from the user

const singleItems = [
    {
        id: 1,
        description: "Pet Alligator",
        price: 48,
        condition: "Like New",
        src: "/images/profileListings/alligator.jpg",
        href: ""
    },
    {
        id: 2,
        description: "Shrink Ray Gun",
        price: 126,
        condition: "Used",
        src: "/images/profileListings/shrink ray gun.jpg",
        href: ""
    },
    {
        id: 3,
        description: "Missle",
        price: 516,
        condition: "Used",
        src: "/images/profileListings/missle.jpg",
        href: ""
    }
]

export default function ProfileListings() {
    return (
        <div>
            <Typography sx={{color: "#0033a0", padding: "10px 0px"}}>
                Results (3)
            </Typography>
            <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
                {singleItems.map(({ id, description, price, condition, src, href }) => (
                    <Grid key={id} xs={6} sm={4} md={4}>
                        <ListingCard
                            description={description}
                            price={"$" + price}
                            condition={condition}
                            src={src}
                            href={href}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}