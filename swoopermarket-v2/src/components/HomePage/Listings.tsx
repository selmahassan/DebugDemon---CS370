'use client';

import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ListingCard from '@/components/HomePage/ListingCard';
import { Typography, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SearchBar from '@/components/SearchBar';
import { ItemType } from '@/types/itemType';


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
              return item.product_name.toLowerCase().includes(searchQuery.toLowerCase());
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
            <Typography variant="h6" style={{ marginLeft: "10px" }}>Filters</Typography>
            <br />
        </div>
        <Grid id="filter" container rowSpacing={2} columnSpacing={2}>
          <Grid id="sort-by" key={1} xs={12} sm={2}>
              <div style={{ marginLeft: "10px" }}>
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
          </Grid>
          <Grid id="item-category" key={2} xs={12} sm={2}>
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
          </Grid>
          <Grid id="price" key={3} xs={12} sm={2}>
            <div style={{marginLeft:"10px"}}>
              <Typography>Price</Typography>
              <TextField sx={{minWidth: 192.19, marginRight: "10px", marginTop: "10px"}} id="outlined-basic" label="Min" variant="outlined" value={priceMinOption} onChange={handlePriceMinChange}/>
              <TextField sx={{minWidth: 192.19, marginRight: "10px", marginTop: "10px"}} id="outlined-basic" label="Max" variant="outlined" value={priceMaxOption} onChange={handlePriceMaxChange}/>
            </div>
          </Grid>
          <Grid id="condition" key={4} xs={12} sm={2}>
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
          </Grid>
        </Grid>
        <Typography sx={{ color: "#0033a0", padding: "10px 0px", mb: 1, mt: 2}}>
          Results ({searchResults.length})
        </Typography>
        <Grid id="listing-container" container rowSpacing={3} columnSpacing={3}>
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
