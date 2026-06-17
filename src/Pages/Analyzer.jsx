import Header from '../components/Header'
import UploadCard from '../components/Upload'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from "react-router-dom";
import { useContext} from 'react';
import { AuthContext } from '../context/Authcontext';
function Analyzer() {

  const {isLoggedIn,user}=useContext(AuthContext);
 useGSAP(()=>
 {
      gsap.fromTo('#u',
        {
          opacity:0,
          x:-100,
          ease:'back.in'
        },
        {
          opacity:1,
          x:0,
        }
      )
 }
)
  return (
    <>
    <div className="Head" >
      <Header isloggedin={isLoggedIn} username={user?.email.slice(0,2).toUpperCase()}/>
    </div>
    <div className='Hero'>
        <h1 id='u'>Upload Your Resume</h1>
        <p>Get instant AI-powered insights on your resume.<br/>
We’ll analyze your skills, formatting, and overall impact in seconds.</p>
        <UploadCard/>
    </div>
    </>
  );
}

export default Analyzer; 