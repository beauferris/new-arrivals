import Sidebar from "./UI/Sidebar";
import './Settings.css';
import { Outlet } from "react-router-dom";
import { Box } from '@chakra-ui/react';


const Settings = () => {

    return (
        <Box className='settings'>
            <Box className='sidebar'>
                <Sidebar />
            </Box>

            <Box className='settings-info'>
                <Outlet />
            </Box>
        </Box>
    )
}

export default Settings;