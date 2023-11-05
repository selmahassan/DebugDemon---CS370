import { StickyAlert } from "@/types/stickyAlert";
import Box from "@mui/material/Box";
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
            <Box style={{ position: "fixed", top: '10vh', left: '50%', transform: 'translateX(-50%)', zIndex: 999}}>
                <Collapse in={openSuccess}>
                    <Alert severity="success" onClose={handleAlertClose} >
                        <AlertTitle>Success</AlertTitle>
                        {successMessage}
                    </Alert>
                </Collapse>
            </Box>
        )
    } else if (openError) {    
        return (
            <Box style={{ position: "fixed", top: '10vh', left: '50%', transform: 'translateX(-50%)', zIndex: 999}}>
                <Collapse in={openError}>
                    <Alert severity="error" onClose={handleAlertClose} >
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                </Collapse>
            </Box>
        )
    }
}

export default StickyAlert;