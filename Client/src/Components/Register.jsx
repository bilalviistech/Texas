import React, {useState} from 'react'
import logincss from '../css/loginpage.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    return (
        <>
            <ToastContainer />
            <div className={logincss.bodyy}>
                <div className={logincss.outer}>
                    <h1>Admin Panel</h1>
                    <form >
                        <p>Enter Name</p>
                        <input className={logincss.in} type="text" placeholder="Enter Your Name" id="a" onChange={(e) => setName(e.target.value)} required/>
                        <p>Enter Phone</p>
                        <input className={logincss.in} type="text" placeholder="Enter Your Phone" id="a" onChange={(e) => setPhone(e.target.value)} required/>
                        <p>Enter Email</p>
                        <input className={logincss.in} type="email" placeholder="Enter Your Email" id="a" onChange={(e) => setEmail(e.target.value)} required/>
                        <p>Enter Password</p>
                        <input className={logincss.in} type="password" placeholder="Enter Your Password" id="b" onChange={(e) => setPassword(e.target.value)} required/>
                        <p>Enter Re-Type Password</p>
                        <input className={logincss.in} type="password" placeholder="Enter Your Retype Password" id="b" onChange={(e) => setPassword(e.target.value)} required/>
                        <br />
                        <p>If you have already account so please <Link to='/'><span>LogIn?</span></Link></p>
                        <input type="submit" value="Submit" className={logincss.bt} />
                    </form>
                    
                </div>
            </div>
        </>
    )
}

export default Register
