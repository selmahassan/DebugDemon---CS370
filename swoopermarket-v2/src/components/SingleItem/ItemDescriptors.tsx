import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ItemHeader from './Descriptors/ItemHeader';
import ItemBody from './Descriptors/ItemBody';
import ItemInterest from './Descriptors/ItemInterest';
import { Descriptor } from '@/types/itemDescriptor';

export default function ItemDescriptors({ descriptors } : { descriptors: Descriptor }) {
    return (
        <Stack direction="column" spacing={2}>
            <ItemHeader 
                title={descriptors.listingTitle}
                seller={descriptors.sellerId}
                email={descriptors.email}
                phone={descriptors.phone}

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