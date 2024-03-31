import React from 'react'
import style from './assets/AboutUs.module.css'
function AboutUs() {
  return (
    <div className={style.aboutUsBody}> 
    <div>
        <p>
This is the final capstone project for the Front-End Development course with the Knowledge Academy. 
This project is the culmination of 100 hours of lectures and over 100 hours of practice and research. 
I am Ibrahim Attatreh, and these are my contact details. Thank you for visiting this site.</p>

    <div>
    <div>
    <img src="src\compnents\Footer\assets\image/Icon.svg" alt="no Icon" />
    <p>ibrahem.atat2003@gmail.com</p>
  </div>
  <div>
    <img src="src\compnents\Footer\assets\image/Icon (1).svg" alt="no Icon" />
    <p>+972569603629</p>
  </div>
    </div>
    <div className='d-flex align-items-center justify-content-center gap-2'>
   <a href="https://www.facebook.com/Ibrahem.Atatri" > <img src="src\compnents\Footer\assets\image/Button (1).svg" alt="no Icon" /></a>
    <a href="https://www.linkedin.com/in/ibrahem-atatri-965504234/"><img src="src\compnents\Footer\assets\image/Button (2).svg" alt="no Icon" /></a>
  </div>
  </div>
    </div>
  )
}

export default AboutUs