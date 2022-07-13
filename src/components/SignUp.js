import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import authContext from '../context/authContext';
import Logo from '../Images/Logo.png'

const Signup = () => {

    const context = useContext(authContext);
    const { authSignup } = context;
    const [crediantials, setCrediantials] = useState({ username: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let pswrd = document.getElementById('Password1').value;
        let cPswrd = document.getElementById('Password2').value;
        if (pswrd === cPswrd) {
            authSignup(crediantials.username, crediantials.email, crediantials.password);
        }
        else
            alert("Password mismatched")
    }

    const onChange = (e) => {
        setCrediantials({ ...crediantials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container authContainer'>

                <div className='signupBox1'>
                    <img className='img boxLogo' src={Logo} alt="Voo-Doo" />
                </div>
                <div className='signupBox2'>
                    <h2 className='formHead'>Signup</h2>
                    <form className='authForm'  onSubmit={handleSubmit}>
                        <div className="formContainer">
                            <label className='form-content' htmlFor="username">Name</label><br />
                            <input className='form-cont' type="text" placeholder="Enter Name" name="username" onChange={onChange} required /><br />
                            <label className='form-content' htmlFor="email">Email</label><br />
                            <input className='form-cont' type="text" placeholder="Enter Email" name="email" required  onChange={onChange}/><br />
                            <label className='form-content' htmlFor="password">Password</label><br />
                            <input className='form-cont' type="password" id="Password1" placeholder="Enter Password" name="password"  onChange={onChange} required /><br />
                            <label className='form-content' htmlFor="cPassword">Confirm Password</label><br />
                            <input className='form-cont' type="password" id="Password2" placeholder="Re-Enter Password" name="cPassword"  onChange={onChange} required /><br />
                            <button className='form-content formBtn' type="submit">Signup</button><br />
                            <p className='form-content'>Already have an account! <Link to="/Login">Login</Link></p>
                        </div>
                    </form>
                </div>

            </div>
        </>

    )
}

export default Signup

