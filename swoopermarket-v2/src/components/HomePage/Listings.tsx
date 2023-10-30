'use client';

import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SearchBar from '@/components/SearchBar';
import { ItemType } from '@/types/itemType';


const singleItems = [
    {
        listing_id: 1,
        product_name: "Nike Go FlyEase",
        descr: "Generic Description",
        category: "Clothing",
        price: 75.00,
        condition: "New",
        listing_img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c76e2119-acb7-4944-9085-d4f5ae2bda4a/go-flyease-easy-on-off-shoes-LGmqKx.png",
    },
    {
        listing_id: 8,
        product_name: "Shrink Ray Gun",
        descr: "Generic Description",
        category: "Weaponry",
        price: 126,
        condition: "Used",
        listing_img: "/images/profileListings/shrink ray gun.jpg",
    },
    {
        listing_id: 2,
        product_name: "Levi's Baggy Dad Women's Jeans",
        descr: "Generic Description",
        category: "Clothing",
        price: 38.75,
        condition: "Used",
        listing_img: "https://lsco.scene7.com/is/image/lsco/A34940028-alt3-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800",
    },
    {
        listing_id: 9,
        product_name: "Missile",
        descr: "Generic Description",
        category: "Weaponry",
        price: 516,
        condition: "Used",
        listing_img: "/images/profileListings/missle.jpg",
    },
    {
        listing_id: 3,
        product_name: "Green Two-Person Couch w/ Really Comfy Cushions",
        descr: "Generic Description",
        category: "Furniture",
        price: 250.99,
        condition: "Used",
        listing_img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291Y2h8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    },
    {
        listing_id: 4,
        product_name: "Full Length Mirror",
        descr: "Generic Description",
        category: "Appliances",
        price: 50.99,
        condition: "Used",
        listing_img: "https://m.media-amazon.com/images/I/71Ag3ZttNYL.jpg",
    },
    {
        listing_id: 5,
        product_name: "Minifridge w/ Freezer",
        descr: "Generic Description",
        category: "Appliances",
        price: 40.57,
        condition: "Used",
        listing_img: "https://m.media-amazon.com/images/I/61t7HEwQGXL.jpg",
    },
    {
        listing_id: 6,
        product_name: "Microwave",
        descr: "Generic Description",
        category: "Appliances",
        price: 38.95,
        condition: "New",
        listing_img: "https://m.media-amazon.com/images/I/71FxVPHqhWL._AC_UF700,800_QL80_.jpg",
    },
    {
        listing_id: 7,
        product_name: "Pet Alligator",
        descr: "Generic Description",
        category: "Animals",
        price: 48,
        condition: "Like New",
        listing_img: "/images/profileListings/alligator.jpg",
    }
]


export default function Listings({listings}: {listings:Array<any>}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('recent');
    const [categoryOption, setCategoryOption] = useState('all');
    const [priceMinOption, setPriceMinOption] = useState('');
    const [priceMaxOption, setPriceMaxOption] = useState('');
    const [conditionOption, setConditionOption] = useState('all');

    const searchResults = listings
        .filter((item) => {
            if (searchQuery) {
              return item.descr.toLowerCase().includes(searchQuery.toLowerCase());
            }
            else return item;
        })
        .filter((item) => {
            if (priceMinOption && priceMaxOption) {
              return (item.price >= parseFloat(priceMinOption) && item.price <= parseFloat(priceMaxOption));
            }
            else return item;
        })
        .filter((item) => {
            if (conditionOption === 'all') {
              return item;
            }
            else if (conditionOption === 'new') {
              return item.condition === "New";
            }
            else if (conditionOption === 'likenew') {
              return item.condition === "Like New";
            }
            else if (conditionOption === 'used') {
              return item.condition === "Used";
            }
        })
        .filter((item) => {
          if (categoryOption === 'all') {
            return item;
          }
          else if (categoryOption === 'clothing') {
            return item.category === "Clothing";
          }
          else if (categoryOption === 'weaponry') {
            return item.category === "Weaponry";
          }
          else if (categoryOption === 'furniture') {
            return item.category === "Furniture";
          }
          else if (categoryOption === 'appliances') {
            return item.category === "Appliances";
          }
          else if (categoryOption === 'animals') {
            return item.category === "Animals";
          }
      })
        .sort((a, b) => {
            if (sortOption === 'recent') {
                let b_listing_id = b.listing_id.toString()
                let a_listing_id = a.listing_id.toString()
                return b_listing_id.localeCompare(a_listing_id);
            } else if (sortOption === 'lowToHigh') {
                return a.price - b.price;
            } else if (sortOption === 'highToLow') {
                return b.price - a.price;
            }
            return 0;
        });

  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
      setSortOption(event.target.value);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
      setCategoryOption(event.target.value);
    };

    const handlePriceMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceMinOption(event.target.value);
    };

    const handlePriceMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceMaxOption(event.target.value);
    };

    const handleConditionChange = (event: SelectChangeEvent<string>) => {
      setConditionOption(event.target.value);
    };
  
    return (
      <>
        <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
          <SearchBar placeHolderText="Search SwooperMarket" onSearch={handleSearch}/>
        </Grid>
        <div>
            <Typography variant="h6">Filters</Typography>
            <br />
        </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                    <Typography>Sort By</Typography>
                    <FormControl sx = {{ minWidth: 192.19, marginRight: "10px", marginTop: "10px"}}>
                        <Select
                            value={sortOption}
                            onChange={handleSortChange}
                            sx={{ color: "#0033a0" }}>
                            <MenuItem value="recent">Recent</MenuItem>
                            <MenuItem value="lowToHigh">Price (Low to High)</MenuItem>
                            <MenuItem value="highToLow">Price (High To Low)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginLeft: "10px" }}>
                    <Typography>Item Category</Typography>
                    <FormControl sx = {{ minWidth: 192.19, marginRight: "10px", marginTop: "10px"}}>
                        <Select
                            value={categoryOption}
                            onChange={handleCategoryChange}
                            sx={{ color: "#0033a0" }}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="clothing">Clothing</MenuItem>
                            <MenuItem value="weaponry">Weaponry</MenuItem>
                            <MenuItem value="appliances">Appliances</MenuItem>
                            <MenuItem value="furniture">Furniture</MenuItem>
                            <MenuItem value="animals">Animals</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style = {{marginLeft: "10px"}}>
                  <Typography>Price</Typography>
                  <TextField sx={{minWidth: 192.19, marginRight: "10px", marginTop: "10px"}} id="outlined-basic" label="Min" variant="outlined" value={priceMinOption} onChange={handlePriceMinChange}/>
                </div>
                <div>
                  <Typography sx = {{marginTop: "25px"}}>to</Typography>
                </div>
                <div style = {{marginLeft: "10px"}}>
                  <TextField sx={{minWidth: 192.19, marginRight: "10px", marginTop: "34px"}} id="outlined-basic" label="Max" variant="outlined" value={priceMaxOption} onChange={handlePriceMaxChange}/>
                </div>
                <div style={{marginLeft:"10px"}}>
                    <Typography>Condition</Typography>
                    <FormControl sx = {{ minWidth: 192.19, marginRight: "10px", marginTop: "10px"}}>
                        <Select
                            value={conditionOption}
                            onChange={handleConditionChange}
                            sx={{ color: "#0033a0" }}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="new">New</MenuItem>
                            <MenuItem value="likenew">Like New</MenuItem>
                            <MenuItem value="used">Used</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        <br></br>
        <Typography sx={{ color: "#0033a0", padding: "10px 0px", mb: 1}}>
          Results ({searchResults.length})
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {searchResults.map((item: ItemType) => (
            <>
                <Grid id="listings" key={item.listing_id} xs={12} sm={4} md={4}>
                    <ListingCard item={item} />
                </Grid>
            </>
          ))}  
        </Grid>
    </>
    )
}
