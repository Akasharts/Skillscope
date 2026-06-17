
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Analyzer from './Pages/Analyzer'
import Signup from './Pages/Signup'
import { Routes, Route } from "react-router-dom";
import Result from './Pages/Result';
function App() {

  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/analyzer'element={<Analyzer/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/SignUp' element={<Signup/>}/>
    <Route path='/Result' element={<Result/>}/>
   </Routes>
  );
}

export default App
