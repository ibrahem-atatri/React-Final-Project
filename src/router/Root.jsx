import React, { useContext } from 'react'
import NavBar from '../compnents/NavBar/NavBar'
import Footer from '../compnents/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { userContext } from '../../context/User'
function Root() {
  const {setShowAuthInformation} = useContext(userContext);
  const {showAuthInformation} = useContext(userContext);
  return (
    <>
     <div onClick={(e)=>{
        if(showAuthInformation==true ){
          setShowAuthInformation(false)
        }
      }}>
    <NavBar  />
    <div style={{minHeight:'60vh'}}><Outlet  />
    </div>
    
   <Footer/>
   </div>
 
    </>
  )
}

export default Root