
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Footer from "./components/Footer";



function App() {
  return (
    <div >
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/create-recipe' element={<CreateRecipe/>} />
        <Route path='/saved-recipe' element={<SavedRecipe/>} />
      </Routes>
      <Footer/>
    </Router>
   
    </div>
  );
}

export default App;
