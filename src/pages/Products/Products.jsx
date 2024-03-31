import React, { useContext, useEffect, useState } from 'react'
import style from './assets/Products.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContext } from '../../../context/User';
import { Bounce, toast } from 'react-toastify';
function Products() {
  const {userToken} = useContext(userContext);
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const {categoryId,setCategoryId} = useContext(userContext);
   
  
  
    // Fetch categories
    useEffect(() => {
      const getCategories = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_URL}/categories/active?page=1&limit=100`);
          setCategories(response.data.categories);
          
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      getCategories();
    }, []);
  
    const getProducts = async () => {
      setLoading(true);
        try {
              
            
            if(categoryId===''){
              
            const response = await axios.get(`${import.meta.env.VITE_URL}/products?page=1&limit=10`);
            setProducts(response.data.products);
            }
          else  {
            
          const response = await axios.get(`${import.meta.env.VITE_URL}/products/category/${categoryId}`);
          setProducts(response.data.products);
          }
         
           
           
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {


        getProducts();
        
    }, [categoryId]);
    const handleCategoryChange = (e) => {
      setCategoryId(e.target.value);
      
  };
  async function addToCart(id) {
    setLoading(true);
    try{
    const token = localStorage.getItem('userToken');
    const {data} = await axios.post(`${import.meta.env.VITE_URL}/cart`,{
        productId:id
    },
    {
        headers:{
            Authorization:`Tariq__${token}`
        }
    });

    toast.success('Added successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}catch(error){
   
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    finally{
        setLoading(false);
    }
}

function logInAlert(choise){
  let text = '';
  if(choise==1)
  text='Log in to be able to add to the cart'
      else
      text='Log in to be able to buy'
      

          toast.info(text, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
}

    return (
        <div className="container text-center mt-5 border-top">
            <div className="d-flex flex-column mb-5 gap-2 justify-content-center align-items-center">
                <h2 className='  mt-3 fs-1 fw-bold'>products</h2>
                <p className='text-secondary text-capitalize'>Indulge in a shopping spree across an array of categories brimming with diverse products.</p>
            </div>
            
            <select name="categories" id="categories" onChange={handleCategoryChange} >
            <option key='All Categories' value=''>All Categories</option>
                {categories.map(category =>(

            <option key={category._id} value={category._id} selected={categoryId===category._id?'selected':''}>{category.name}</option>
           
  )                 )}
</select>

                  
{
  loading ? (
 <div className="d-flex justify-content-center mt-5">
  <div className="spinner-border text-success" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

  ) : (
    products.length > 0 ? (
      <div className={style.productBoxes}>
      {products.map((product) => (
        <div className={style.productBox} key={product._id}>
          <img src={product.mainImage.secure_url} alt="" />

          <div className={style.productMajorDetails}>
            <h3>{product.name.slice(0, 30)} ...</h3>
            {/* <span className={style.price}>${product.price}</span> */}
            {product.discount>0?
               <div className={style.withDicount}>
              <span className={style.finalPrice}>{product.finalPrice}$</span>
              <span className={style.startPrice} >{product.price}$</span></div> :
               <span className={style.price} >{product.price}$</span>}
            
          </div>
          <p className={style.description}>
            {product.description.slice(0, 120)} ...
          </p>
          <div className={style.productButton}>
            <button className={style.buyNow} onClick={()=>{
                if(!userToken){
                    logInAlert(2);
                }
            }}>Buy Now </button>
            <Link className={style.link} to={`/product/${product._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </Link>
            <button
              className={style.cartButton}
              onClick={() => {
                if(userToken)
                addToCart(product._id);
            else
            logInAlert(1);
              }}
              disabled={loading == true ? "disabled" : ""}
            >
              {/* {loading==true?'wait...':'add to cart'} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart-plus"
                viewBox="0 0 16 16"
              >
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg>
            </button>
          </div>
        </div>
        ))}
      </div>
    ) : (
      <div>Oops, we've sold all products.</div> // Display a message if there are no products
    )
  )
}
           
             
        </div>
    )
}

export default Products