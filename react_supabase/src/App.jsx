
import './App.css'
import { Routes,Route } from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Homepage from './pages/Homepage';
// import { Notfound } from './pages/Notfound';
//supabse project password WngYdyZpPAQ1YDtn
function App() {

  
  return (
   <Routes>
     <Route exact path="/signup" element={<Signup/>}/>
     <Route exact path="/" element={<Signin/>}/>
     <Route exact path="/homepage" element={<Homepage/>}/>
  
   </Routes>
  )
}

export default App
