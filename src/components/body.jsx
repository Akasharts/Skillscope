import { use } from 'react'
import './body.css'
import Card from './Card'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
function Body()
{
  useGSAP(()=>
  {
    gsap.to('#h',{
      ease:'power1.inOut',
      opacity:1,
      x:0,
    })
    gsap.fromTo('#phara',{
      opacity:0,
      ease:'back.inOut',
      y:20,
    },{
      opacity:1,
      y:0,
      delay:0.05
    })
   
  },[])
    return(<>
   
    <div className="Hero" >
    <h1 id='h' style={{opacity:0 ,transform:"translateX(-100px)"}}>Analyze Your Resume Like a Recruiter</h1>
    <p id='phara'>Get instant AI-powered insights on your resume’s strengths and weaknesses.<br/>
Identify missing skills, improve formatting, and optimize your profile to stand out in today’s competitive job market.</p>
    <Card text={
    <>
    <div className="features">
      <ul>
          <li>   
          <div className="logo"> 
          <svg className='one' viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{filter:"drop-shadow(0 0 4px #f97316) drop-shadow(0 0 10px #f97316) drop-shadow(0 0 20px rgba(249,115,22,0.6))"}}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
           </div> 
           <div className="content">
          <span className='Headings'>Instant Resume Analysis</span>
          <span className='Description'>Analyze your resume instantly and see how well it performs against ATS and recruiter expectations.
         </span>
          </div>
          </li>

          <li>
            <div className="logo">
             <svg className='two' viewBox="0 0 24 24" fill="none" stroke="#f93416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{filter:"drop-shadow(0 0 4px #f95a16) drop-shadow(0 0 10px #f94b16) drop-shadow(0 0 20px rgba(249, 113, 22, 0.6))"}}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div className="content">
              <span className='Headings'>Identify Skill Gaps</span>
          <span className='Description'>Find missing skills and keywords that employers commonly look for in candidates.
            </span>
            </div>
          </li>

          <li>
            <div className="logo">
                     <svg  className='three' viewBox="0 0 24 24" fill="none" stroke="#165ef9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{filter:"drop-shadow(0 0 4px #1669f9) drop-shadow(0 0 10px #1687f9) drop-shadow(0 0 20px rgba(22, 113, 249, 0.6))"}}>
<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>  
            <div className="content">
            <span className='Headings'>Improve Resume Formatting</span>
          <span className='Description'>Detect formatting mistakes, readability issues, and structure problems automatically.
            </span>
            </div>
          </li>
        
          <li> 
            <div className="logo">
              <svg className='four' viewBox="0 0 24 24" fill="none" stroke="#5af916" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{filter:"drop-shadow(0 0 4px #9ef916) drop-shadow(0 0 10px #b5f916) "}}>
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> 
              </div>  
              <div className="content">
            <span className='Headings'>Smart AI Suggestions </span>
          <span className='Description'>Receive intelligent recommendations tailored to improve your resume content.
            </span>
            </div>
          </li>

      </ul>
      </div>
    </>
    } 

    buttonText="Analyze Resume" features={["ATS Score", "Skill Gap", "Smart Suggestions"]} to='/analyzer' />
    </div>
    </>);
}
export default Body;