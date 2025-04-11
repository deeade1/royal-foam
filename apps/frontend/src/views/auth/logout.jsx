import { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from '../../../context/authContext';
import { setJwtToken, setRefreshToken } from "../../../utilities/auth";
import { LOGOUT } from "../../../queries/mutations";


function LogOut() {

    const [user, logout] = useContext(AuthContext)
    
     const [logOut, { data, loading }] = useMutation(LOGOUT, {
      
        update(proxy, { data: { signIn: userData }}) {
        
           const onLogout = () => {
            logout();
            navigate('/');
         } 
         console.log(user)
        
        },
        onError({graphQLErrors}){
            setErrors(graphQLErrors);
        },
        variables: {input: values}
     });
}
