// src/ui/menu/Toolsbar.js
import React from 'react';

const Toolsbar = ({ children }) => {
    return (
        <div
            className="fixed bottom-0 left-0 z-50 flex items-center justify-between w-full p-4 transition-all duration-300 bg-white rounded-lg shadow-md"
        >
            
            <div className="flex items-center gap-2">
                {children} {/* Include buttons or other elements */}
            </div>
        </div>
    );
};

export default Toolsbar;
