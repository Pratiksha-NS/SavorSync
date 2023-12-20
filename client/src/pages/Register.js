import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
     
      if (!username || !password) {
        console.error("Username and password are required.");
        alert("Username and password are required.")
        return;
      }

        try {
            await axios.post("http://localhost:5000/auth/register", {
                username,
                password
            });
            alert("Registration Completed! Now login.")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <main className="form-signin w-50 m-5 login">
                <form onSubmit={handleSubmit}>

                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating m-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name" onChange={(event) => setUsername(event.target.value)} value={username} />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="form-floating m-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(event) => setPassword(event.target.value)} value={password} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-dark w-30 m-2 py-2" type="submit">Register</button>
                    <Link to="/auth" className='m-3 btn btn-dark'  >LogIn</Link>
                </form>
            </main>
        </div>
    )
}
