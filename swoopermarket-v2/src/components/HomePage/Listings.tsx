import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import { ItemType } from '@/types/itemType';


const singleItems = [
    {
        listing_id: 1,
        descr: "Nike Go FlyEase",
        price: 75.00,
        condition: "New",
        src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c76e2119-acb7-4944-9085-d4f5ae2bda4a/go-flyease-easy-on-off-shoes-LGmqKx.png",
    },
    {
        listing_id: 8,
        descr: "Shrink Ray Gun",
        price: 126,
        condition: "Used",
        src: "/images/profileListings/shrink ray gun.jpg",
    },
    {
        listing_id: 2,
        descr: "Levi's Baggy Dad Women's Jeans",
        price: 38.75,
        condition: "Used",
        src: "https://lsco.scene7.com/is/image/lsco/A34940028-alt3-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800",
    },
    {
        listing_id: 9,
        descr: "Missile",
        price: 516,
        condition: "Used",
        src: "/images/profileListings/missle.jpg",
    },
    {
        listing_id: 3,
        descr: "Green Two-Person Couch w/ Really Comfy Cushions",
        price: 250.99,
        condition: "Used",
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291Y2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    },
    {
        listing_id: 4,
        descr: "Full Length Mirror",
        price: 50.99,
        condition: "Used",
        src: "https://m.media-amazon.com/images/I/71Ag3ZttNYL.jpg",
    },
    {
        listing_id: 5,
        descr: "Minifridge w/ Freezer",
        price: 40.57,
        condition: "Used",
        src: "https://m.media-amazon.com/images/I/61t7HEwQGXL.jpg",
    },
    {
        listing_id: 6,
        descr: "Microwave",
        price: 38.95,
        condition: "New",
        src: "https://m.media-amazon.com/images/I/71FxVPHqhWL._AC_UF700,800_QL80_.jpg",
    },
    {
        listing_id: 7,
        descr: "Pet Alligator",
        price: 48,
        condition: "Like New",
        src: "/images/profileListings/alligator.jpg",
    }
]

async function getData() {
    // TODO: make fetch non-local URL
    const res = await fetch('http://localhost:3000/api/listing', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function Listings() {
    const listings = await getData()

    return (
        <>
            <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
                <Typography variant="h5" sx={{color: "#0033a0"}}></Typography>
                <SearchBar placeHolderText="Search SwooperMarket"/>
            </Grid>
            <Typography sx={{color: "#0033a0", padding: "10px 0px"}}>
                Results ({listings.rows.length})
            </Typography>
            <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
                {listings.rows.map((item: ItemType) => (
                    <Grid key={item.listing_id} xs={12} sm={3} md={6}>
                        <ListingCard item={item}/>
                    </Grid>
                ))}
                {/* {singleItems.map((item) => (
                    <Grid key={item.listing_id} xs={12} sm={6} md={4}>
                        <ListingCard item={item}/>
                    </Grid>
                ))} */}
            </Grid>
        </>
    )
}
