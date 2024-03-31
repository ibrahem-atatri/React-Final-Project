import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../../context/User";
import style from "./assets/Product.module.css";
import { Bounce, toast } from "react-toastify";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [subImages, setSubImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //
  const { userToken } = useContext(userContext);
  //
  //   fetch code
  const getProduct = async () => {
    setLoading(true);

    try {
      const response = await axios({
        method: "get",
        url: `${import.meta.env.VITE_URL}/products/${id}`,
      });
      setProduct(response.data.product);
      setImage(response.data.product.mainImage.secure_url);
      setSubImages(response.data.product.subImages);
      console.log(response.data.product.subImages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  // end fetch code

  // add to cart code
  async function addToCart(id) {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/cart`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      toast.success("Added successfully", {
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
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  }
  // end add to cart code

  // log in alert code
  function logInAlert(choise) {
    let text = "";
    if (choise == 1) text = "Log in to be able to add to the cart";
    else text = "Log in to be able to buy";

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
  // end log in alert code
  return (
    <div className="container text-center mt-5 border-top">
      <div className="d-flex flex-column mb-5 gap-2 justify-content-center align-items-center">
        <h2 className="  mt-3 fs-1 fw-bold">products</h2>
        <p className="text-secondary text-capitalize">
          Indulge in a shopping spree across an array of categories brimming
          with diverse products.
        </p>
      </div>

      {/*  */}
      {
  loading ? (
 <div className="d-flex justify-content-center mt-5">
  <div className="spinner-border text-success" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

  ) :(!error ? (  <div className={style.productBox}>
    <div className={style.productBoxUp}>
      <div className={style.productBoxUpStart}>
        <div
          id="carouselExampleDark"
          className={`${style.swiper} carousel carousel-dark slide`}
        >
          <div className="carousel-inner">
            <div
              className={`${style.swiperImage} carousel-item active`}
              data-bs-interval={10000}
            >
              <img src={image} className="d-block w-100" alt="..." />
            </div>
            {subImages.map((subImage) => (
              <div
                className={`carousel-item active ${style.swiperImage} `}
                data-bs-interval={2000}
                key={subImage.public_id}
              >
                <img
                  src={subImage.secure_url}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className={style.productBoxUpEnd}>
        <div>
          <h3>{product.name} </h3>
          {product.discount > 0 ? (
            <div className={style.withDicount}>
              <span className={style.finalPrice}>
                {product.finalPrice}$
              </span>
              <span className={style.startPrice}>{product.price}$</span>
            </div>
          ) : (
            <span className={style.price}>{product.price}$</span>
          )}
        </div>
        <div className={style.productButton}>
          <button
            className={style.buyNow}
            onClick={() => {
              if (!userToken) {
                logInAlert(2);
              }
            }}
          >
            Buy Now{" "}
          </button>

          <button
            className={style.cartButton}
            onClick={() => {
              if (userToken) addToCart(product._id);
              else logInAlert(1);
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
    </div>
    {/*  */}
    <div className={style.productBoxBottom}>
      <div>
        <p className={style.description}>{product.description} </p>
      </div>
    </div> 
    </div>):(<div>Error When Fetching Product {error}</div>))}
    
      
    </div>
  );
}

export default Product;
