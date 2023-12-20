import React from 'react'
import { Link } from 'react-router-dom'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export default function Footer() {
    return (
        <div>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-body-secondary">© 2023 <SoupKitchenIcon/> SavorSync, Inc</p>                 
                    <ul className="nav col-md-4 justify-content-end">
                        <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Home</Link></li>
                        <li className="nav-item"><Link to="/create-recipe" className="nav-link px-2 text-body-secondary">Create</Link></li>
                        <li className="nav-item"><Link to="/saved-recipe" className="nav-link px-2 text-body-secondary">Saved</Link></li>
                        <li className="nav-item"><Link to="/auth" className="nav-link px-2 text-body-secondary">Login</Link></li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}
