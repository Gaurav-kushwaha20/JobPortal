import React from 'react';
import Navbar from '../Components/Navbar';

const Layout = ({children}) => {
    return (
        <div className="">
            <Navbar />
            <p className={'text-3xl font-bold text-center mt-5'}>Job-Seeker Dashboard</p>
            {children}
        </div>
    );
};

export default Layout;