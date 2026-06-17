import {createContext, useState} from 'react';
export const AnalysisContext=createContext();
function AnalysisProvider({children})
{
    const [analysisData,setAnalysisData]=useState({
        ats_score:0,
        best_roles:[],
        skills:[],
        strengths:[],
        weaknesses:[],
        suggestions:[]
    });
    return (
        <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
            {children}
        </AnalysisContext.Provider>
    );
}
export default AnalysisProvider;