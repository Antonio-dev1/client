import {useState , useEffect  , createContext} from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

export const UserContext = createContext();


const  UserContextProvider = ({children}) => {
    const [user , setUser] = useState({});
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [jwt , setJwt] = useState('');
    const [decodedJWT , setDecodedJWT] = useState('');
    const navigate = useNavigate();
    

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
    } , [jwt]);

    const handleLogout = () => {

        setTimeout(() => {
        return sessionStorage.setItem('jwt' , ''),
        setJwt(''),
        setIsLoggedIn(false),
        navigate('/')
        } , 1000)
        
    };

    return (  
        <UserContext.Provider value = {{user ,setUser, isLoggedIn, setIsLoggedIn , jwt , setJwt , decodedJWT , handleLogout}}> {children} </UserContext.Provider>
    );
}
 
export default UserContextProvider ;