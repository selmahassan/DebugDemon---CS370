import { StickyAlert } from "@/types/stickyAlert";
import Stack from "@mui/material/Stack";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';

const StickyAlert: React.FC<StickyAlert> = ({ successMessage, errorMessage, openSuccess, setOpenSuccess, openError, setOpenError }) => {
    const handleAlertClose = () => {
        if(openSuccess)
            setOpenSuccess(false);
        if(openError)
            setOpenError(false);
    }

    if(openSuccess){
        return (
            <Stack alignItems="center" style={{ position: "fixed", top: '10vh', zIndex: 999}}>
                <Collapse in={openSuccess}>
                    <Alert severity="success" onClose={handleAlertClose} >
                        <AlertTitle>Success</AlertTitle>
                        {successMessage}
                    </Alert>
                </Collapse>
            </Stack>
        )
    } else if (openError) {    
        return (
            <Stack alignItems="center" style={{ position: "fixed", top: '10vh', zIndex: 999}}>
                <Collapse in={openError}>
                    <Alert severity="error" onClose={handleAlertClose} >
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                </Collapse>
            </Stack>
        )
    }
}

export default StickyAlert;