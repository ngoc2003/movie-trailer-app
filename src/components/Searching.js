import React from 'react';

const Searching = ({handleChange}) => {
    return (
        <div className="flex mb-10 rounded-lg overflow-hidden">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white"
            placeholder="Search your film here . . ."
            onChange={handleChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    );
};

export default Searching;