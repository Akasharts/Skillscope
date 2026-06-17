import Header from '../components/Header';
import { useLocation } from "react-router-dom";
import { useContext} from 'react';
import { AuthContext } from '../context/Authcontext';
import { AnalysisContext } from '../context/AnalysisProvider';
import './Result.css'
function Result() {
    const {isLoggedIn,user}=useContext(AuthContext);
    const {analysisData}=useContext(AnalysisContext);
    return (<>
        <Header isloggedin={isLoggedIn} username={user?.email.slice(0,2).toUpperCase()}/>
        <div className='result-container'>
            <h2>Analysis Result</h2>
            <div className="top">
            <div className="ATSscore">
            <p><strong>ATS Score:</strong></p>
            <p><span className='score'> {analysisData.ats_score}</span><span className='ten'> / 10</span></p>
            </div>
           
            <div className='best-roles'>
               <p> <strong>Best Roles:</strong></p>
            <ul>
              {analysisData.best_roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
             </ul>
            </div>
             </div>
            <div className="skills">
                <p><strong>Skills:</strong></p>
                <ul>
                    {analysisData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
            <div className="st-we">
                    <div className="strength">
                        <p><strong>Strengths:</strong></p>
                        <ul>
                            {analysisData.strengths.map((strength, index) => (
                                <li key={index}>•  {strength}</li>
                            ))}
                        </ul>
                            
                    </div>
                    <div className="weakness">
                        <p><strong>Weaknesses:</strong></p>
                        <ul>
                            {analysisData.weaknesses.map((weakness, index) => (
                                <li key={index}>•  {weakness}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="suggestions">
                        <p><strong>Suggestions:</strong></p>
                        <ul>
                            {analysisData.suggestions.map((suggestion, index) => (
                                <li key={index}>•  {suggestion}</li>
                            ))}
                        </ul>
                    </div>
              </div>
        </div>
    
    </>);
}
export default Result;