import React from 'react';
import { Navigate } from 'react-router-dom';

const Button = ({onClick, className, children, fluid}) => {
    return (
        <button
          onClick={onClick}
          className={`py-3 px-6 rounded-lg capitalize bg-primary ${className} ${fluid ? 'w-full' : 'w-auto'}`}
        >
          {children}
        </button>
    );
};

export default Button;