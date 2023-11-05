export interface StickyAlert {
    successMessage: string,
    errorMessage: string,
    openSuccess: boolean,
    setOpenSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    openError: boolean,
    setOpenError: React.Dispatch<React.SetStateAction<boolean>>
}