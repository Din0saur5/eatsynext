'use client'
import React, { useEffect, useState } from 'react'
import ToggleSwitch from './ToggleSwitch';
import CardGrid from '@/components/CardGrid';

const DashLayout = (user_id:{user_id:string}) => {
    
    const [isToggled, setIsToggled] = useState<boolean>(true); 

    useEffect(()=>{
        const value = sessionStorage.getItem('dashtoggle');
        if (value) {
            
            const tog = JSON.parse(value) as boolean;
            setIsToggled(tog)
          } 
        else{
          sessionStorage.setItem('dashtoggle',JSON.stringify(true))
        }  
    },[])



    const toggle = () => {
      sessionStorage.setItem('dashtoggle',JSON.stringify(!isToggled))
      setIsToggled(!isToggled);
        
      }


  return (
    <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
    <ToggleSwitch toggle={toggle} isToggled={isToggled} />
    { isToggled? (
      <>
      <CardGrid param={{name:'favorites', value:user_id.user_id }} user_id={user_id.user_id}/>
         </>
    ):(
      <CardGrid 
      param={{name:'user_id', value:user_id.user_id }} user_id={user_id.user_id}
      /> 
    )


    }
  </div> 
  )
}

export default DashLayout
