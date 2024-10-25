import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import img2 from '../img/undraw_profile.svg'
import p1 from '../img/undraw_profile_1.svg'
import p2 from '../img/undraw_profile_2.svg'
import p3 from '../img/undraw_profile_3.svg'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/AuthSlice';

const Nav = () => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const Dispatch = useDispatch();
    const handleLogout = ()=>{
        Dispatch(logout())
    }

    return (
        <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>
                {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                            aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form> */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                            aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                        placeholder="Search for ..." aria-label="Search"
                                        aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow">
                        <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-dark text-uppercase"></span>
                            <img className="img-profile rounded-circle" src={img2} alt="" onClick={toggleDropdown}/>
                        </Link>
                        <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${isDropdownVisible ? '' : 'd-none'}`}
                            aria-labelledby="userDropdown">
                            {/* <Link className="dropdown-item" to="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </Link>
                            <Link className="dropdown-item" to="../MusicWorld/home.php">
                                <i className="fas fa-music fa-sm fa-fw mr-2 text-gray-400"></i>
                                Music World
                            </Link>
                            <div className="dropdown-divider"></div> */}
                            <Link className="dropdown-item" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt fa-lg fa-fw mr-2 text-gray-800"></i>
                                <span className='logoutSpan' style={{fontWeight:600,fontSize:"17px",color:"#5a5c69"}}>Logout</span>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
  
  )
}

export default Nav