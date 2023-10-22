import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ItemHeader from './Descriptors/ItemHeader';
import ItemBody from './Descriptors/ItemBody';
import ItemInterest from './Descriptors/ItemInterest';

export default function ItemDescriptors() {
    return (
        <Stack direction="column" spacing={2}>
            <ItemHeader />
            <Divider light />
            <ItemBody />
            <ItemInterest />
        </Stack>
    );
}