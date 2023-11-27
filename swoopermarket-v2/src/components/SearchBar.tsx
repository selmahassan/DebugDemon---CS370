import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

// UI for search bar on home page
export default function SearchField({ placeHolderText, onSearch }: { placeHolderText: string; onSearch: (query: string) => void }) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        onSearch(query);
    };

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
                    onChange = {handleInputChange}
                />
            </FormControl>
        </form>
    )
}
