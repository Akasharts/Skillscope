import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import {Link} from "react-router-dom"
function Card({text,buttonText,features=[],to,className=""})
{
    useGSAP(()=>{
        gsap.fromTo('#t',
            {
                opacity:0,
                x:50,
                ease:'circ.inOut',
            },
            {
                opacity:1,
                x:0,
                stagger:0.1,
                delay:0.5,
            }
        )
          gsap.fromTo( '.features',
            {
                opacity:0,
                x:-50,
                ease:'power1.inOut'
            },
            {
                opacity:1,
                x:0,
                delay:0.5,
            }
         )
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
    })
    return(<>
    <div className={`Card${className}`}>
        <p id='t'>{text}</p>
        {
            features.length>0&&(
                <>
                <div className="featuresofresult">
                    <ul>
                        {features.map((item,index)=>(
                            <li key={index}><span className="tick">✔</span> {item}</li>
                        ))}
                    </ul>
                </div>
                </>
            )
        }
        {
            to?(<Link to={to}><button id='btn'>{buttonText}</button></Link>):(<button id='btn'>{buttonText}</button>)
        }

    </div>
    </>);
}
export default Card;