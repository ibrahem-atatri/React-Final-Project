import axios from 'axios';
import React, { useState } from 'react'
import style from './assets/ForgetPassword.module.css'
import { object, string } from 'yup';
function ForgetPassword() {
    const [email,setEamil] = useState('');
    const [user,setUser] = useState({
        email:"",
        password:"",
        code:"",
    })
    const [successSendCode,setSuccessSendCode] = useState(false);
    const [codeIsSended,setCodeIsSended] = useState(false);
    const [loader,setLoader] = useState(false);
    const [error,setError] = useState('');


            //start yub code for set password
            const [validationError,setValidationError] = useState({
               
                email:'',
                password:'',
                code:''
              })
              
              
              
              const validateData = async ()=>{
              
                const RegisterSchema = object({
                  email:string().email().required(),
                  password:string().min(4).max(16).required(),
                code:string().required()
                });
              
                try{
                  await RegisterSchema.validate(user,{abortEarly:false});
                  setValidationError({
              
                    email:'',
                    password:'',
                    code:''
                  
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
              // end yub code

            //   start yub code for send code
            const [validationErrorForSendCode,setValidationErrorForSendCode] = useState('')
              
              
              
              const validateDataForSendCode = async ()=>{
              
                const RegisterSchema = string().email().required();
              
                try{
                  await RegisterSchema.validate(email,{abortEarly:false});
                  
                  setValidationErrorForSendCode('')
                  return true;
                }catch(error){
                
                  setValidationErrorForSendCode(error.message);
                  return false;
                }
              
              }
            //   end yub code for send code 

    function handleEmail(e){
        const {value} = e.target;
        setEamil(value);
    }

    async function handleSendCode  (e){
        e.preventDefault();
        const validate = await validateDataForSendCode();
        if(validate){
        setLoader(true);
        try{
            const {data} = await axios.patch(`${import.meta.env.VITE_URL}/auth/sendcode`,{
                "email":email
            })
            setSuccessSendCode(true);
            setCodeIsSended(true);
            setTimeout(() => {
                setCodeIsSended(false);
            }, 2000);
            setValidationErrorForSendCode('');
        
            
        }catch (error) {
    
            alert(error.response.data.message);
  
      }finally{
        setLoader(false);
      }
        }
    }

        function handleUserInformation (e){
            const {name,value} = e.target;
            setUser({
                ...user,
                [name]:value,
            })
        }
    async function setNewPassword (e){
        e.preventDefault();
        const validate = await validateData();
        if(validate){
        setLoader(true);
        try{
            const {data} = await axios.patch(`${import.meta.env.VITE_URL}/auth/forgotPassword`,{
                "email":user.email,
                "password":user.password,
                "code":user.code,
            })
            setError('');
        }catch(error){
            setError(error.response.data.message);
        }finally{
            setLoader(false);
        }
    }
    }

    if(codeIsSended)
    return(
        <div className={style.sendedSuccessfull}>
            <img src="src\compnents\authInformation\assets\image\tick-circle.png" alt="" />
            <h2>code sended Successfull check your email</h2>
        </div>
        )
    if(successSendCode)
    return (
        <div className={style.afterSendCode}>
            <h4>enter your information to set new password</h4>
            <form onClick={setNewPassword}>
                <div>
                <label htmlFor="">your email:-</label>
                <input type="email" name='email' value={user.email}  onChange={handleUserInformation}/>
                </div>
                <p>{validationError.email}</p>
                <div>
                <label htmlFor="">new password :-</label>
                <input type="password" name='password' value={user.password} onChange={handleUserInformation}/>
                </div>
                <p>{validationError.password}</p>
                <div>
                <label htmlFor="">code sended to your email:-</label>
                <input type="text" name='code' value={user.code} onChange={handleUserInformation}/>
                </div>
                <p>{validationError.code}</p>
                <button type='submit' disabled={loader?'disabled':''}>{loader?'wait..':'send'}</button>
                <p>{error}</p>
            </form>
        </div>
        )
  return (
    <div className={style.sendCode} onSubmit={handleSendCode} >
        <form action="">
        <label htmlFor="email">enter your email</label>
        <input type="email" id='email' value={email} onChange={handleEmail}/>
        <p>{validationErrorForSendCode}</p>
        <button  type='submit' disabled={loader?'disabled':''}>{loader?'wait..':'send code'}</button>
        </form>
    </div>
  )
}

export default ForgetPassword