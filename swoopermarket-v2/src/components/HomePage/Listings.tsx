"use client";
import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography, FormControl, Select, MenuItem, TextField } from '@mui/material';
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
        id: '8',
        description: "Shrink Ray Gun",
        price: 126,
        condition: "Used",
        src: "/images/profileListings/shrink ray gun.jpg",
    },
    {
        id: "2",
        description: "Levi's Baggy Dad Women's Jeans",
        price: 38.75,
        condition: "Used",
        src: "https://lsco.scene7.com/is/image/lsco/A34940028-alt3-pdp-lse?fmt=jpeg&qlt=70&resMode=bisharp&fit=crop,0&op_usm=1.25,0.6,8&wid=2000&hei=1800",
    },
    {
        id: '9',
        description: "Missile",
        price: 516,
        condition: "Used",
        src: "/images/profileListings/missle.jpg",
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
    },
    {
        id: '7',
        description: "Pet Alligator",
        price: 48,
        condition: "Like New",
        src: "/images/profileListings/alligator.jpg",
    }
]

export default function Listings() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('recent');
    const [categoryOption, setCategoryOption] = useState('all');
    const [priceMinOption, setPriceMinOption] = useState('');
    const [priceMaxOption, setPriceMaxOption] = useState('');
    const [conditionOption, setConditionOption] = useState('all');

    const searchResults = singleItems
        .filter((item) => {
            if (searchQuery) {
              return item.description.toLowerCase().includes(searchQuery.toLowerCase());
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
        .sort((a, b) => {
            if (sortOption === 'recent') {
                return b.id.localeCompare(a.id);
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

    const handleSortChange = (event) => {
      setSortOption(event.target.value as string);
    };

    const handleCategoryChange = (event) => {
      setCategoryOption(event.target.value as string);
    };

    const handlePriceMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceMinOption(event.target.value);
    };

    const handlePriceMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceMaxOption(event.target.value);
    };

    const handleConditionChange = (event) => {
      setConditionOption(event.target.value as string);
    };
  
    return (
      <div>
        <Grid id="header" container direction="row" justifyContent="space-between" alignItems="center" padding="24px 0px">
          {/* TODO: add in logo */}
          <Typography variant="h5" sx={{ color: "#0033a0" }}>
            Swoopermarket Logo
          </Typography>
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
                            sx={{ color: "#0033a0" }}
                        >
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
                            sx={{ color: "#0033a0" }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="clothing">Clothing</MenuItem>
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
                            sx={{ color: "#0033a0" }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="new">New</MenuItem>
                            <MenuItem value="likenew">Like New</MenuItem>
                            <MenuItem value="used">Used</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        <br></br>
        <Typography sx={{ color: "#0033a0", padding: "10px 0px" }}>
          Results ({searchResults.length})
        </Typography>
        <Grid id="listings" container rowSpacing={3} columnSpacing={3}>
          {searchResults.map((item) => (
            <Grid key={item.id} xs={12} sm={6} md={4}>
              <ListingCard item={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }