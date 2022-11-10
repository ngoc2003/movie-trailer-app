import React from 'react';

const Label = ({children, className='text-slate-900'}) => {
    return (
        <div className={`text-left capitalize ${className}`}>{children}</div>
    );
};

export default Label;