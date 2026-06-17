
import './Login.css';
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";   
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {supabase } from "../supabaseClient";
import { useState } from "react";
function Signup()
{
    const [message,setMessage]=useState("");
    const {setIsLoggedIn,setUser}=useContext(AuthContext);
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [pass,setPass]=useState("");
    const [role,setRole]=useState("");
    const [loading, setLoading] = useState(false);  
    const handleSignin=async()=>
        {
            if (loading) return;
            setLoading(true);
            const {data: existinguser}=await supabase.from("profiles").select("*").eq("email",email).maybeSingle();
            if(existinguser)
            {
                setMessage("Email already registered. Try logging in instead.");
                setLoading(false);
                return;
            }
            const {data, error}= await supabase.auth.signUp({email,password:pass});
            if(error)
            {
                
                setMessage(error.message);
                setLoading(false);
                return;
            }
            const {error:insertError}=await supabase.from("profiles").insert([{
                id:data.user.id,
                name:name,
                email:email,
                exp_level:role
            }]);

            if(insertError)
            {
                setMessage(insertError.message);
                setLoading(false);
                return;
            }
            setIsLoggedIn(true);
            setUser(data.user);
            setMessage("Account created successfully!");
            navigate("/");
            setLoading(false);
        }
    return(<>
    <div className="Card">
     <p id="w">Create your account</p>
        <div className="form-group">
            <label className='la'>Name</label>
                <input  className="in"
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your Name"
                required
                />
            </div>
            <div className="form-group">
                <label className='la'>Email</label>
                <input  className="in"
                type='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your Email "
                required
            />
            </div>
            <div className="form-group">
                <label className='la'>Password</label>
               <input  className="in"
                type='password'
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                placeholder="Enter your Password"
                required
            />
            </div>
            <div className="form-group">
                <label className='la'>Experience Level</label>
            <select id='s'
                value={role}
                onChange={(e)=>setRole(e.target.value)}
            >
                <option value="">Select Experience Level</option>
                <option value="St">Student</option>
                <option value="Fr">Fresher (Graduate)</option>
                <option value="Pr">Professional</option>
                <option value="Ma">Manager</option>
                <option value="Fre">Freelancer</option>
            </select>
            </div>
                <button id='btn'  onClick={handleSignin} >Sign Up</button>
                <p>Already have an Account?<Link className="L" to='/Login'>Login</Link></p>
                {
                message &&
                <p className="message">
                {message}
                </p>
            }
    </div>
    </>)
}
export default Signup ;