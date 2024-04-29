import React, { useState } from 'react';

const ToggleSwitch = ({toggle , isToggled }:{toggle:any, isToggled:boolean}) => {
  

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-72 h-16 bg-base-200 border border-neutral  rounded-full p-1 cursor-pointer" onClick={()=>toggle()}>
        {/* Sliding background */}
        <div className={`absolute left-0 top-0 h-16 w-1/2 bg-primary shadow-inner shadow-base-100 rounded-full transition-transform duration-300 ${isToggled ? 'translate-x-full' : 'translate-x-0'}`}></div>
        {/* Text labels */}
        <div className="flex justify-between items-center h-full w-full px-4">
          <span className={`text-lg  font-bold z-10 transition-opacity duration-300 ${isToggled ? 'opacity-50' : 'opacity-100'}`}>My Recipes</span>
          <span className={`text-lg  font-bold z-10 transition-opacity duration-300 ${isToggled ? 'opacity-100' : 'opacity-50'}`}>Favorites</span>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;