import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/neos1.svg'

const Sidebar = () => {
    return (
    
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15" >
                        {/* <i className="fa fa-music"></i> */}
                        {/* <i class="fa-brands fa-neos"></i> */}
                        <img src={logo} alt="" width={30}/>
                    </div>
                    <div className="sidebar-brand-text mx-3" style={{textTransform:"none"}}>Texas Source</div>
                </Link>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Sidebar
                </div>
                <div class="my-2 mx-auto">
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-user"></i>
                        <span>Admin</span>
                    </Link>
                </li> */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/user-installment-status">
                        <i className="fas fa-fw fa-user"></i>
                        <span>User Installment Status</span>
                    </Link>
                </li> */}
                <li className="nav-item">
                    <Link className="nav-link" to="/add-product">
                        <i className="fas fa-fw fa-user"></i>
                        <span>Add Product</span>
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/add-events">
                        <i className="fas fa-fw fa-music"></i>
                        <span>Add Events</span>
                    </Link>
                </li> */}
                </div>
            
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
            
    );
}

export default Sidebar;
