import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';

const singleItems = [
    {
        id: "1",
        description: "Nike Go FlyEase",
        price: 75.00,
        condition: "New",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c76e2119-acb7-4944-9085-d4f5ae2bda4a/go-flyease-easy-on-off-shoes-LGmqKx.png",
    },
    {
        id: "2",
        description: "Levi's Baggy Dad Women's Jeans",
        price: 38.75,
        condition: "Used",
        src: "https://lsco.scene7.com/is/image/lsco/A34940028-alt3-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800",
    },
    {
        id: "3",
        description: "Green Two-Person Couch w/ Really Comfy Cushions",
        price: 250.99,
        condition: "Used",
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291Y2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    },
    {
        id: "4",
        description: "Full Length Mirror",
        price: 50.99,
        condition: "Used",
        src: "https://m.media-amazon.com/images/I/71Ag3ZttNYL.jpg",
    },
    {
        id: "5",
        description: "Minifridge w/ Freezer",
        price: 40.57,
        condition: "Used",
        src: "https://m.media-amazon.com/images/I/61t7HEwQGXL.jpg",
    },
    {
        id: "6",
        description: "Microwave",
        price: 38.95,
        condition: "New",
        src: "https://m.media-amazon.com/images/I/71FxVPHqhWL._AC_UF700,800_QL80_.jpg",
    }
]

export default function Listings() {
    return (
        <div>
            <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
                {/* TODO: add in logo */}
                <Typography variant="h5" sx={{color: "#0033a0"}}></Typography>
                <SearchBar placeHolderText="Search SwooperMarket"/>
            </Grid>
            <Typography sx={{color: "#0033a0", padding: "10px 0px"}}>
                Results (6)
            </Typography>
            <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
                {singleItems.map((item) => (
                    <Grid key={item.id} xs={12} sm={6} md={4}>
                        <ListingCard item={item}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
