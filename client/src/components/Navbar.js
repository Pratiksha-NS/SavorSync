import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export default function Navbar() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }


    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3" ><SoupKitchenIcon/> SavorSync</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create-recipe">Create</Link>
                            </li>
                        </ul>

                        {!cookies.access_token ? <Link className="btn btn-dark" to="/auth" >Login</Link>
                            : (
                                <div className='d-flex'>
                                    <Link className="btn btn-dark" to="/saved-recipe">Saved</Link>
                                    <button onClick={logout} className='btn btn-dark' >LogOut</button>
                                </div>)}
                    </div>
                </div>
            </nav>
        </div>
    )
}
