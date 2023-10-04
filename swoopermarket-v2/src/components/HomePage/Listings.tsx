import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography } from '@mui/material';

const singleItems = [
    {
        id: 1,
        description: "Blue Three Person Couch w/ Coffee Table and Orange chairs",
        price: 50.99,
        condition: "New",
        src: "https://source.unsplash.com/random",
        href: ""
    },
    {
        id: 2,
        description: "Levis Jeans 541 Mens 38x30",
        price: 38.95,
        condition: "Used",
        src: "https://source.unsplash.com/random",
        href: ""
    },
    {
        id: 3,
        description: "Blue Three Person Couch w/ Coffee Table and Orange chairs",
        price: 50.99,
        condition: "Used",
        src: "https://source.unsplash.com/random",
        href: ""
    },
    {
        id: 4,
        description: "Blue Three Person Couch w/ Coffee Table and Orange chairs",
        price: 50.99,
        condition: "Used",
        src: "https://source.unsplash.com/random",
        href: ""
    },
    {
        id: 5,
        description: "Levis Jeans 541 Mens 38x30",
        price: 38.95,
        condition: "Used",
        src: "https://source.unsplash.com/random",
        href: ""
    },
    {
        id: 6,
        description: "Levis Jeans 541 Mens 38x30",
        price: 38.95,
        condition: "New",
        src: "https://source.unsplash.com/random",
        href: ""
    }
]

export default function Listings() {
    return (
        <div>
            <Typography sx={{color: "#0033a0", padding: "10px 0px"}}>
                Results (6)
            </Typography>
            <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
                {singleItems.map(({ id, description, price, condition, src, href }) => (
                    <Grid key={id} xs={4}>
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