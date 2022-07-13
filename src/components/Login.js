import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import authContext from '../context/authContext';
import Logo from '../Images/Logo.png'

const Login = () => {

    const context = useContext(authContext);
    const { authLogin } = context;
    const [crediantials, setCrediantials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (crediantials.email === "") {
            alert("Please enter a valid email", "warning")
        }
        else {
            authLogin(crediantials.email, crediantials.password);
        }
    }

    const onChange = (e) => {
        setCrediantials({ ...crediantials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container authContainer'>

                <div className='authBox1'>
                    <img className='img boxLogo' src={Logo} alt="Voo-Doo" />
                </div>

                <div className='authBox2'>
                    <h2 className='formHead'>Login</h2>
                    <form className='authForm' onSubmit={handleSubmit}>
                        <div className="formContainer">
                            <label className='form-content' htmlFor="email">Email</label><br />
                            <input className='form-cont' type="text" placeholder="Enter Email" name="email" required  onChange={onChange}/><br />
                            <label className='form-content' htmlFor="password">Password</label><br />
                            <input className='form-cont' type="password" placeholder="Enter Password" name="password" required  onChange={onChange}/><br />
                            <button className='form-content formBtn' type="submit">Login</button><br />
                            <p className='form-content'>don't have an account! <Link to="/Signup">Signup</Link></p>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login