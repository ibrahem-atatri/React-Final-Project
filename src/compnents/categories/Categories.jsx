import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import { Navigation } from 'swiper';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../../context/User";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCategoryId } = useContext(userContext);

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/categories/active?page=1&limit=100`
        );
        setCategories(response.data.categories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <div className=" mt-5 container border-top ">
      <h2 className="mb-5 mt-3 fs-1 fw-bold">Feature Category</h2>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div>Error fetching categories: {error}</div>
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={1.7}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.3,
              spaceBetween: 30,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 40,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link
                to="/products"
                onClick={() => {
                  setCategoryId(category._id);
                }}
              >
                <img src={category.image.secure_url} alt={category.name} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Categories;
