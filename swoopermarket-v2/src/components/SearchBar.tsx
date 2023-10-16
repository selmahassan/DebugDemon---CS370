import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export default function SearchField({ placeHolderText }: {placeHolderText: string}) {
    return (
        <form noValidate autoComplete="off">
            <FormControl sx={{ width: '35ch' }}>
                <OutlinedInput 
                    id="search"
                    placeholder={placeHolderText} 
                    style={{'borderRadius':'50px'}}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </form>
    )
}