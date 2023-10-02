import Grid from '@mui/material/Unstable_Grid2';
import SingleItem from '@/components/HomePage/SingleItem';
import { Typography } from '@mui/material';

const singleItems = [
    {
        id: 1,
        description: "Blue Three Person Couch w/ Coffee Table and Orange chairs",
        price: 50.99,
        condition: "New",
        href: ""
    },
    {
        id: 2,
        description: "Levis Jeans 541 Mens 38x30",
        price: 38.95,
        condition: "Used",
        href: ""
    },
    {
        id: 3,
        description: "Blue Three Person Couch w/ Coffee Table and Orange chairs",
        price: 50.99,
        condition: "Used",
        href: ""
    },
    {
        id: 4,
        description: "Blue Three Person Couch w/ Coffee Table and Orange chairs",
        price: 50.99,
        condition: "Used",
        href: ""
    },
    {
        id: 5,
        description: "Levis Jeans 541 Mens 38x30",
        price: 38.95,
        condition: "Used",
        href: ""
    },
    {
        id: 6,
        description: "Levis Jeans 541 Mens 38x30",
        price: 38.95,
        condition: "New",
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
                {singleItems.map(({ id, description, price, condition, href }) => (
                    <Grid key={id} xs={4}>
                        <SingleItem
                            description={description}
                            price={"$" + price}
                            condition={condition}
                            href={href}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}