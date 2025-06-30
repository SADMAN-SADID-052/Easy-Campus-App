import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>

            <div className='max-w-6xl mx-auto'>
             

             <Outlet></Outlet>
            </div>

            <footer>
                
            </footer>
            
        </div>
    );
};

export default AuthLayout;