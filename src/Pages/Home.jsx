import Header from '../components/Header'
import Body from '../components/body'
import { useLocation } from "react-router-dom";
import { useContext} from 'react';
import { AuthContext } from '../context/Authcontext';
function Home()
{
     const location = useLocation();
    const {isLoggedIn,user}=useContext(AuthContext);
    return(
    <>
    <Header isloggedin={isLoggedIn} username={user?.email.slice(0,2).toUpperCase()}/>
    <Body/>
    </>);
}
export default Home;