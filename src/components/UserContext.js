import {useState , useEffect  , createContext} from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext();


const  UserContextProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [jwt , setJwt] = useState(sessionStorage.getItem('jwt'));
    const [decodedJWT , setDecodedJWT] = useState('');
    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        if(token){
            setJwt(token);
            setIsLoggedIn(true);
            setDecodedJWT(jwt_decode(token))
        }
        else{
            setIsLoggedIn(false);
        }
    } , []);

    return (  
        <UserContext.Provider value = {{user ,setUser, isLoggedIn, setIsLoggedIn , jwt , setJwt , decodedJWT}}> {children} </UserContext.Provider>
    );
}
 
export default UserContextProvider ;