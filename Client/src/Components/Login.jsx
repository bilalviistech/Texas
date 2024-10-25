import React from 'react'
import logincss from '../css/loginpage.module.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { loginUser } from '../redux/AuthSlice'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const customToastStyle = {
        background: 'green',
        color: 'white',
        fontSize: '16px',
        borderRadius: '8px',
    };
    const customProgressStyle = {
        background: 'red',
    };
    
    const notify = (message) => toast(message, {
        toastStyle: customToastStyle,
        progressBar: true,
        progressStyle: customProgressStyle,
        progressClassName: 'toast-progress'
    });

    const handleLogin = async (e) => {
        e.preventDefault(); 

        const resultAction = await dispatch(loginUser({ email, password }));
  
        if (loginUser.fulfilled.match(resultAction)) {
            if (resultAction.payload.success === true) {
                navigate('/dashboard'); 
            } 
            else {
                // notify(resultAction.payload.message)
                console.log(resultAction.payload)
                // setTimeout(() => {
                //     window.location.reload();     
                // }, 3000);
            }
        } 
        else {
            navigate('/'); 
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={logincss.bodyy}>
                <div className={logincss.outer}>
                    <h1>Admin Panel</h1>
                    <form onSubmit={handleLogin}>
                        <p>Enter Email</p>
                        <input className={logincss.in} type="email" placeholder="Enter Email" id="a" onChange={(e) => setEmail(e.target.value)} required/>
                        <p>Enter Password</p>
                        <input className={logincss.in} type="password" placeholder="Enter Password" id="b" onChange={(e) => setPassword(e.target.value)} required/>
                        <br />
                        <p>If you havn't account please <Link to="/register"><span>SignUp?</span></Link></p>
                        <input type="submit" value="Submit" className={logincss.bt} />
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Login