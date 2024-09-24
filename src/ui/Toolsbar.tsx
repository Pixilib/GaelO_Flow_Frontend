import React from 'react';

const Toolsbar = ({ children }) => {
    return (
        <div className="fixed flex items-center justify-center w-full h-16 max-w-5xl gap-10 mx-auto transition-all duration-300 bg-white shadow-xl bottom-4 rounded-xl"> 
            {children}
        </div>
    );
};

export default Toolsbar;
