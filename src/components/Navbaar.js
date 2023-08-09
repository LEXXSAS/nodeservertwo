import React from 'react'
import { Link } from 'react-router-dom'
import { signup, auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import {useLocation} from 'react-router-dom';

const Navbaar = () => {
    const location = useLocation();

    const userSignOut = () => {
        signOut(auth).then(() => {
          console.log('вы вышли')
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('email');
        }).catch(error => console.log(error))
      }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/home'>CRUD APP</Link>
                    {location.pathname !== '/' ? <Button onClick={userSignOut} variant='contained' color='primary' size='small'>Выйти</Button> : null}
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                          
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className ="btn btn-outline-success" type ="submit">Search</button>
                        </form>
                    </div> */}
                </div>
            </nav>
        </header>
    )
}

export default Navbaar
