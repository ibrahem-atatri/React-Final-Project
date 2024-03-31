import React, { useState } from 'react'
import AuthInformation from '../../compnents/authInformation/AuthInformation'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { object, string } from 'yup';
import style from './assets/Register.module.css';




function Register() {

const [loader,setLoader] = useState(false);
const navigate = useNavigate();
const [validationError,setValidationError] = useState({
  userName:'',
  email:'',
  password:'',
  image:''

})



const validateData = async ()=>{

  const RegisterSchema = object({
    userName:string().min(5).max(20).required(),
    email:string().email().required(),
    password:string().min(4).max(16).required(),
    image:string().required(),
  });

  try{
    await RegisterSchema.validate(user,{abortEarly:false});
    setValidationError({
      userName:'',
      email:'',
      password:'',
      image:''
    })
    return true;
  }catch(error){
    const errors ={};
    error.inner.forEach(err=>{
    
      errors[err.path] = err.message;
      
    })
    setValidationError(errors);
  
    return false;
  }

}




const [user,setUser] = useState({
  userName:'',
  email:'',
  password:'',
  image:''
});

  async function handleInput (e) {
    
    const {name,value} = e.target;
      setUser({
        ...user,
        [name]:value,
      });

      

  }

  function handleImageInput (e){
    const {name,files} = e.target;
    setUser({
      ...user,
      [name]:files[0],
    });
  }

  async function handleForm (e) {
    e.preventDefault();
    const validate = await validateData();

    if(validate){
    setLoader(true);
    const formData = new FormData();
    formData.append('userName',user.userName);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('image',user.image);

    try{
    const {data} = await axios({
      method:'post',
      url:`${import.meta.env.VITE_URL}/auth/signup`,
      data:formData,
    })
    
    setUser({
      userName:'',
      email:'',
      password:'',
      image:''
    });
    setValidationError({
      userName:'',
      email:'',
      password:'',
      image:''
    })

    toast.success('Registration successful!', {
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
      navigate('/');
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
     
    }finally{
      setLoader(false);
    }
  }
  }
  return (
    <div className={style.register}>
    <form className={style.registerForm} onSubmit={handleForm}>
      <img src="src\pages\Home\assets\image\logo.svg" alt="not found" />
      <div> 
        <label>Name</label>
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleInput}
        />
        </div>
        <p>{validationError.userName}</p>
        <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
        />
        </div>
       
      <p>{validationError.email}</p>
      <div>   <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
        />
        </div>
     
            <p>{validationError.password}</p>
            <div><label>Image</label>
        <input type="file" name="image" className={style.imageInput} onChange={handleImageInput} />
        </div>
        
        <p>{validationError.image}</p>
        <button type="submit" disabled={!loader?null:'disabled'} >{!loader?'register':'wait...'}</button>
      </form>
     

    </div>
  )
}

export default Register




