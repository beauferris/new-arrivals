
import { Outlet } from "react-router-dom";
import { Box } from '@chakra-ui/react';


const Settings = () => {

    return (
        <Box >
            <Box m='2' className='settings-info'>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Settings;