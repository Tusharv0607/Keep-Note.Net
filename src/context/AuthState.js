import authContext from "./authContext";
import React from "react";
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {

    const host = 'https://keep-note-backend.herokuapp.com';
    let navigate = useNavigate();

    //-------------------------------------------------------------------------------------------//
    //Login Authentication

    const authLogin = async (email, password) => {

        const response = await fetch(`${host}/authenticate/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ email, password })
        })

        const json = await response.json()
        if (response.status === 200) {
            localStorage.setItem('token', json.token);
            localStorage.setItem('userName', json.username);
            navigate("/");
            alert("Logged in successfully!")
        }
        else if (response.status === 404) {
            alert("User Not Found! Please enter correct crediantials")
        }
        else if (response.status === 400) {
            alert("Invalid email or password!")
        }
    }

    //-------------------------------------------------------------------------------------------//
    //SignUp & Authentication

    const authSignup = async (username, email, password) => {

        const response = await fetch(`${host}/authenticate/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ username, email, password })
        });

        const json = await response.json();

        if (response.status === 200) {
            localStorage.setItem('token', json.token);
            localStorage.setItem('userName', json.username);
            navigate("/");
            alert("Successfully Signed Up!", "success")
        }
        else if (response.status === 404) {
            alert("Email already exist! Please Login", "danger")
        }
        else {
            alert("Enter correct details!", "warning")
        }
    }
    return (
        <authContext.Provider value={{ authLogin, authSignup }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;
