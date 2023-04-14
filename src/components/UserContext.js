import {useState , useEffect  , createContext} from 'react';

export const UserContext = createContext();


const  UserContextProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [jwt , setJwt] = useState(sessionStorage.getItem('jwt'));
    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        console.log(token)
        if(token !==''){
            setJwt(token);
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    } , []);

    return (  
        <UserContext.Provider value = {{user ,setUser, isLoggedIn, setIsLoggedIn , jwt , setJwt}}> {children} </UserContext.Provider>
    );
}
 
export default UserContextProvider ;