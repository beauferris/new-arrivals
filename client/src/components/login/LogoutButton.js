import { useAuth0 } from "@auth0/auth0-react";
import {
    Button
   } from '@chakra-ui/react';
const LogoutButton = () => {
    const { logout} = useAuth0();

    return (
        <>
            <Button bg={'black'} 
                    color={'white'}
                    onClick={() => logout({ returnTo: window.location.origin })}>
            {'log out' } 
            </Button>
        </>
    );
};

export default LogoutButton;
