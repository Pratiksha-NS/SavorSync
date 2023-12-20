import React ,{useState}from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword]  = useState("");
  
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleSubmit = async (event)=>{
      event.preventDefault();

      if (!username || !password) {
        console.error("Username and password are required.");
        alert("Username and password are required.")
        return;
      }

      try {
        const response =  await axios.post("https://savorsync-backend.onrender.com/auth/login",{
          username,
          password
        });
  
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      } catch (err) {
        console.error(err)
      }
    }
  

  return (
    <div>
        <main className="form-signin w-50 m-5 login">
        <form onSubmit={handleSubmit}>
         
          <h1 className="h3 mb-3 fw-normal">Login if you have already registered.</h1>

          <div className="form-floating m-2">
            <input type="text" className="form-control" id="floatingInput" placeholder="name" onChange={(event) => setUsername(event.target.value)} value={username} />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating m-2">
            <input type="password" className="form-control" id="floatingPassword" placeholder="email" onChange={(event) => setPassword(event.target.value)} value={password} />
            <label htmlFor="password">password</label>
          </div>
          <button className="btn btn-dark m-2 w-30 py-2" type="submit">Login</button>
          <Link to="/register" className='m-3 btn btn-dark'  >Register</Link>
        </form>
      </main>
    </div>
  )
}
