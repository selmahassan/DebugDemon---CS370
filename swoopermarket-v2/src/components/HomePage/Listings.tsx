'use client';

import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import { ItemType } from '@/types/itemType';


const singleItems = [
    {
        listing_id: 1,
        product_name: "Nike Go FlyEase",
        description: "Generic Description",
        price: 75.00,
        condition: "New",
        listing_img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c76e2119-acb7-4944-9085-d4f5ae2bda4a/go-flyease-easy-on-off-shoes-LGmqKx.png",
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
        listing_id: 2,
        product_name: "Levi's Baggy Dad Women's Jeans",
        description: "Generic Description",
        price: 38.75,
        condition: "Used",
        listing_img: "https://lsco.scene7.com/is/image/lsco/A34940028-alt3-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800",
    },
    {
        listing_id: 9,
        product_name: "Missile",
        description: "Generic Description",
        price: 516,
        condition: "Used",
        listing_img: "/images/profileListings/missle.jpg",
    },
    {
        listing_id: 3,
        product_name: "Green Two-Person Couch w/ Really Comfy Cushions",
        description: "Generic Description",
        price: 250.99,
        condition: "Used",
        listing_img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291Y2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    },
    {
        listing_id: 4,
        product_name: "Full Length Mirror",
        description: "Generic Description",
        price: 50.99,
        condition: "Used",
        listing_img: "https://m.media-amazon.com/images/I/71Ag3ZttNYL.jpg",
    },
    {
        listing_id: 5,
        product_name: "Minifridge w/ Freezer",
        description: "Generic Description",
        price: 40.57,
        condition: "Used",
        listing_img: "https://m.media-amazon.com/images/I/61t7HEwQGXL.jpg",
    },
    {
        listing_id: 6,
        product_name: "Microwave",
        description: "Generic Description",
        price: 38.95,
        condition: "New",
        listing_img: "https://m.media-amazon.com/images/I/71FxVPHqhWL._AC_UF700,800_QL80_.jpg",
    },
    {
        listing_id: 7,
        product_name: "Pet Alligator",
        description: "Generic Description",
        price: 48,
        condition: "Like New",
        listing_img: "/images/profileListings/alligator.jpg",
    }
]


export default function Listings({listings}: {listings:Array<any>}) {
    const [searchQuery, setSearchQuery] = useState('');
    
    const searchResults = listings.filter((item: { descr: string; }) =>
      item.descr.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };

    return (
        <>
            {/* <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
                <Typography variant="h5" sx={{color: "#0033a0"}}></Typography>
                <SearchBar
                  placeHolderText="Search SwooperMarket"
                  onSearch={handleSearch}
                />
            </Grid>
            <Typography sx={{ color: "#0033a0", padding: "10px 0px" }}>
              Results ({searchResults.length})
            </Typography> */}
            <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
                {listings.map((item: ItemType) => (
                    <Grid key={item.listing_id} xs={6} sm={4} md={4}>
                        <ListingCard item={item}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
