import {useRef, useState} from 'react'
import {FiUploadCloud} from 'react-icons/fi'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Upload.css'
import { supabase } from "../supabaseClient";
import { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'
import { useNavigate } from 'react-router-dom'
import { analyzeResume } from '../ai/analyzeResume'
import { AnalysisContext } from '../context/AnalysisProvider'
function Upload()
{
    const boxRef=useRef();
  useGSAP(()=>{
        gsap.fromTo('#t',
            {
                opacity:0,
                y:10,
                ease:'circ.inOut',
            },
            {
                opacity:1,
                y:0,
                stagger:0.1,
                delay:0.5,
            })
             gsap.fromTo( '#btn',
            {
                opacity:0,
                x:50,
                ease:'power1.inOut'
            },
            {
                opacity:1,
                x:0,
                delay:1,
            }
         )
         gsap.fromTo('.box',
            {
                opacity:0,
                x:0,
                ease:'power1.inOut',
                borderRadius:50,

            },
            {
                opacity:1,
                x:200,
                duration:2,
                delay:1,
                borderRadius:100,
                stagger:0.5,
            }
         )
          },[])
    const[file,setFile]=useState(null);
  const handleDrop = (e) => {
    e.preventDefault();
     e.stopPropagation(); 
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };
    const handleChange=(e)=>{ 
        setFile(e.target.files[0]);
    };
 const handleDragOver = (e) => {
    e.preventDefault(); 
  };
   const navigate=useNavigate();
  const {user,isLoggedIn}=useContext(AuthContext);
  const { setAnalysisData } = useContext(AnalysisContext);
  const uploadResume = async ()=>{
    if(isLoggedIn)
    {
        if(!file)
        {
            console.log("No file selected ");
            return;
        }
        const filename=`${user.id}-${Date.now()}-${file.name}`;
        const {data,error}= await supabase.storage.from("Resume").upload(filename,file);
        if(error)
        {
            console.log("Error uploading file",error);
            return;
        }
        const { data: publicUrlData } =
        supabase.storage
            .from("Resume")
            .getPublicUrl(filename);

        const fileUrl =
        publicUrlData.publicUrl;
        console.log("File uploaded successfully");
        const{error:dberror}=await supabase.from("resumes").insert([{user_id: user.id,
                    file_name: file.name,
                    file_type: file.type,
                    file_url: fileUrl,
                    file_size: file.size}]);
        if (dberror) {
            console.log(dberror.message);
            return;
        }
        console.log("Resume record added");
        const analysis=await analyzeResume(file);
        console.log("Analysis result:",analysis);
        setAnalysisData(analysis);  
        navigate('/Result');
    }
    else
    {
       
        navigate('/login');
    }   
  }
    return(
        <div className='upload-card'>
            <input 
            type='file'
            accept='.pdf,.doc,.docx,.png,.jpg'
            onChange={handleChange}
            id='fileinput'
            hidden/>
             
            <label htmlFor='fileinput'  id='t'
            className='upload_area'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
            {file ?(<p>Uploaded: {file.name}</p>):
            (
              <>
              <FiUploadCloud className='upload_icon'></FiUploadCloud>
              <p>Drag & Drop your file here</p>
              <p>or</p>
              <p>click here to upload</p>
              </>
            )}
            </label>
            <button id='btn' onClick={uploadResume}>Analyze Your Resume</button>
        </div>
    );
}
export default Upload;