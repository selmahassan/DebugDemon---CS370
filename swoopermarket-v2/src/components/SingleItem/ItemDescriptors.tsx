import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ItemHeader from './Descriptors/ItemHeader';
import ItemBody from './Descriptors/ItemBody';
import ItemInterest from './Descriptors/ItemInterest';

type Descriptor = {
    listingTitle: string,
    sellerId: string,
    description: string,
    price: number,
    condition: string,
    pickup: string
}

export default function ItemDescriptors({ descriptors } : { descriptors: Descriptor }) {
    return (
        <Stack direction="column" spacing={2}>
            <ItemHeader 
                title={descriptors.listingTitle}
                seller={descriptors.sellerId}
            />
            <Divider light />
            <ItemBody 
                description={descriptors.description}
                price={descriptors.price}
                condition={descriptors.condition}
                pickup={descriptors.pickup}
            />
            <ItemInterest 
                seller={descriptors.sellerId}
            />
        </Stack>
    );
}