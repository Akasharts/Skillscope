import { useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {supabase} from "../supabaseClient";
import { useNavigate } from "react-router-dom";
// import Card from '../components/body/Card/Card'
import './Login.css'
import { useLocation } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import {Link} from 'react-router-dom'
function Login()
{
    const [message,setMessage]=useState("");
    useGSAP(()=>
    {
        gsap.fromTo('.in',
            {
                opacity:0,
                y:10,
                ease:'bounce.inOut',
            },
            {
                opacity:1,
                y:0,
                stagger:0.1,
            }
        )
        gsap.fromTo('#btn',
            {
                opacity:0,
                x:50,
                ease:'expo.inOut',
            },
            {
                opacity:1,
                x:0,
                delay:0.5,
            }
        )
        gsap.fromTo('.la',
            {
                opacity:0,
                y:10,
                ease:'power1.inOut'
            },
            {
                opacity:1,
                y:0,
                delay:0.3,
    
            }
        )
    },[])
        const [email,setEmail]=useState("");
        const [name,setName]=useState("");
        const [pass,setPass]=useState("");
        const [role,setRole]=useState("");
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate()
        const [success,setSuccess]=useState(false);
        const {user,setUser,isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
        const handleLogin =async()=>
        {
            if (loading) return;
            setLoading(true);
            setMessage("");
            const {data ,error}=await supabase.auth.signInWithPassword({email:email,password:pass});
            if(error)
            {
                if(error.message.includes("Invalid login credentials"))
                {
                    setMessage("Account doesn't exist. Create an account");
                }
                else
                {
                    setMessage(error.message);
                }
                setLoading(false);
                return;
            }
            setLoading(false);
            setSuccess(true);
            setIsLoggedIn(true);
            setUser(data.user);
            setTimeout(() => {
                navigate("/");
            }, 1500);
        };


    return(
        <>
        <div className='Card'>
       {
         success ? (<p className="success-message">Login successful! Redirecting...</p>):
         (
            <div className="LoginCard">
             <p id="w">Welcome Back!</p>
            <div className="form-group">
            <label className='la'>Email</label>
            <input className="in"
            type='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your Email "
            required
            />
            </div>
            <div className="form-group">
            <label className='la'>Password</label>
            <input 
            type='password' className="in"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
            placeholder="Enter your Password"
            required
             />
            </div>
            <button id='btn'  onClick={handleLogin} >Login</button>
            <p>Don't have an Account?<Link to='/SignUp' className="S">Sign Up</Link></p>
            </div>
        )
       }
        {message && <p className="message">{message}</p>}
    
    </div>
        </>
    );
}
export default Login;