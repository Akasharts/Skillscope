import './Nav.css';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
function Nav()
{
    const location=useLocation();
    return(
        <ul>
            <li ><Link className={`nav-link ${location.pathname=='/' ? "nav-link-Active" : ""}`} to='/'>Home</Link></li>
            <li ><Link className={`nav-link ${location.pathname=='/analyzer' ? "nav-link-Active" : ""}`}  to='/analyzer'>Analyze Resume</Link></li>
            {/* <li ><Link className="nav-link">Generate Resume</Link></li> */}
            {/* <li ><Link className="nav-link">Contact Us</Link></li> */}
        </ul>
       
    );
}
export default Nav;
