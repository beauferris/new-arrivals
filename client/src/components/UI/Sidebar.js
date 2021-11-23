import './Sidebar.css';
import { Link } from "react-router-dom";
import {Box} from '@chakra-ui/react';
const Sidebar = () => {
    return (
        <Box className='sidebar'>
            <Link className="link" to='/settings/shop'>Shops</Link><br />
            <Link className="link" to='/settings/favorites'>Favorites</Link><br />
        </Box>
    )
}
export default Sidebar
