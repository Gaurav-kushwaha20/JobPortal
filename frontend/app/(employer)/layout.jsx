import React from 'react';

const Layout = ({children}) => {
    return (
        <div className="py-10">
            <p className={'text-3xl font-bold text-center'}>Employer Dashboard</p>
            {children}
        </div>
    );
};

export default Layout;