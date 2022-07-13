import React from 'react';
import Tasks from './Tasks';
import { Link } from 'react-router-dom';



const Home = () => {

    const username = localStorage.getItem('userName');

    return (
        <>      
        <h2 className='mainHead'>Hi {username}! Welcome to KeepNote...</h2>
            <div className='addOption'>
                <div className='addTask-btn'>
                    <Link to="/addTask">
                        <button className='btn'>
                            Add New Task
                        </button>
                    </Link>
                </div>
            </div>
            <div className='homeContainer'>
                <div className='head'>
                    <h3 className='heading'>
                        Your Tasks
                    </h3>
                </div>
                <div className=''>
                    <Tasks />
                </div>
            </div>
        </>
    )
};

export default Home;
