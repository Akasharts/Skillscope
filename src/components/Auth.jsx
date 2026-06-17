import './Auth.css'
import {Link} from 'react-router-dom'
function Auth()
{
    return(<>
    <button><Link className='Login' to='/Login' >Login</Link></button>
    <button><Link className='SignUp' to='/SignUp' >SignUp</Link></button>
    </>);
}
export default Auth;