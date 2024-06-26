import React from 'react'
import style from './assets/style/Home.module.css'
import Categories from '../../compnents/categories/Categories'
import PopularProducts from '../../compnents/PopularProducts/PopularProducts'
import AuthInformation from '../../compnents/authInformation/AuthInformation'
import { Link } from 'react-router-dom'
import logo from "./assets/image/logo.svg"

function Home() {
  return (
    <>
   
   

<div className={style.firstSection }>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={43} viewBox="0 0 40 43" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.5489 40.1274C9.82492 39.0757 5.92609 38.5452 2.14397 38.0592C1.32936 37.9573 0.573044 38.5259 0.514858 39.3269C0.398485 40.1286 0.980691 40.8617 1.73712 40.9636C5.40286 41.4314 9.18465 41.9321 12.734 42.9445C13.4904 43.1641 14.3054 42.7121 14.5381 41.9344C14.7709 41.1574 14.3053 40.3476 13.5489 40.1274Z" fill="#262626" />
      <path fillRule="evenodd" clipRule="evenodd" d="M24.8365 25.2172C18.8433 19.0624 12.0937 13.6998 6.21685 7.37979C5.69318 6.78954 4.76219 6.75792 4.18033 7.30894C3.59846 7.86054 3.5405 8.78807 4.12237 9.37832C9.9992 15.7165 16.7488 21.0966 22.742 27.2696C23.3239 27.8458 24.2547 27.854 24.8365 27.2872C25.3602 26.721 25.4184 25.7934 24.8365 25.2172Z" fill="#262626" />
      <path fillRule="evenodd" clipRule="evenodd" d="M36.0673 1.54341C36.2418 5.06616 36.4161 8.58891 36.5906 12.1123C36.5906 12.9192 37.2892 13.5422 38.1038 13.503C38.9184 13.4631 39.4999 12.7763 39.4999 11.9688C39.3254 8.44018 39.1512 4.91216 38.9766 1.38413C38.9184 0.577224 38.2201 -0.0417174 37.4055 0.00219986C36.649 0.0461172 36.0091 0.737085 36.0673 1.54341Z" fill="#262626" />
    </svg>
    <img src={logo} alt="no image" />
    <h2><span>upgrade</span> your wardrobe with our collection</h2>
  </div>
  <h3>Indulge in <span>Shopping</span>  and <span> Fill Your Cart with Top-Quality Products</span>.</h3>
  <p><span>Discover </span> Your <span>Favorites </span> and <span> Elevate Your Shopping Experience with Unmatched Selections</span>.</p>
  <div className={style.auth}>
    <Link to='/products'>view products</Link>
  </div>
</div>

<Categories/>
      <PopularProducts/>
   
    </>
  )
}

export default Home