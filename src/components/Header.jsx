import './Header.css'
import Nav from './Nav.jsx'
import Auth from './Auth.jsx'
// import Search from './Search/search.jsx'
import { useContext,useState} from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import { useNavigate } from 'react-router-dom';
function Header({isloggedin,username})
{
    const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogout=()=>{
        setLoading(true);
        setTimeout(() => {
            setIsLoggedIn(false);
            navigate('/');
        }, 2000);
    }
    return(<>
    <div className="menu">
    <div className="logo">
        <h1>Skill<span>Scope</span> AI</h1>
    </div>
    <div className="right-section">
        <Nav/>
        {isloggedin?<><div className='profile'><p>{username}</p> <button onClick={handleLogout} className='logout'>Logout </button></div></> :<Auth/>}
    </div>
    </div>
    </>);
}
export default Header;