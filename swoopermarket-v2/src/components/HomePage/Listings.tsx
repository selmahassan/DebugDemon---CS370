import Grid from '@mui/material/Unstable_Grid2';
import SingleItem from '@/components/HomePage/SingleItem';
import { Typography } from '@mui/material';

const PLACEHOLDER_LINKS = [
    { text: 'Profile', href: '/profile', id:1 },
    { text: 'Logout', href: '/login', id:2 },
];

export default function Listings() {
    return (
        <div>
            <Typography sx={{color: "#0033a0", padding: "10px 0px"}}>
                Results (6)
            </Typography>
            <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
                <Grid xs={4}>
                    <SingleItem
                        description="Blue Three Person Couch w/ Coffee Table and Orange chairs"
                        price={"$" + "38.95"}
                        condition="New"
                        href=""
                    />
                </Grid>
                <Grid xs={4}>
                    <SingleItem
                        description="Levis Jeans 541 Mens 38x30"
                        price={"$" + "50.99"}
                        condition="Used"
                        href=""
                    />
                </Grid>
                <Grid xs={4}>
                    <SingleItem
                        description="Blue Three Person Couch w/ Coffee Table and Orange chairs"
                        price={"$" + "50.99"}
                        condition="New"
                        href=""
                    />
                </Grid>
                <Grid xs={4}>
                    <SingleItem
                        description="Blue Three Person Couch w/ Coffee Table and Orange chairs"
                        price={"$" + "50.99"}
                        condition="New"
                        href=""
                    />
                </Grid>
                <Grid xs={4}>
                    <SingleItem
                        description="Blue Three Person Couch w/ Coffee Table and Orange chairs"
                        price={"$" + "50.99"}
                        condition="New"
                        href=""
                    />
                </Grid>
                <Grid xs={4}>
                    <SingleItem
                        description="Blue Three Person Couch w/ Coffee Table and Orange chairs"
                        price={"$" + "50.99"}
                        condition="New"
                        href=""
                    />
                </Grid>
            </Grid>
        </div>
    )
}