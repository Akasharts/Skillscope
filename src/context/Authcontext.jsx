import { createContext, useState } from "react";
export  const AuthContext=createContext();
function Authprovider({children})
{
    const [user,setUser]=useState(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
   
    return(
        <AuthContext.Provider value={{user,setUser,isLoggedIn,setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}
export default Authprovider;