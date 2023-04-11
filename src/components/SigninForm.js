import {FcGoogle} from 'react-icons/fc'
import logo from '../assets/imgs/logo.png'
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
const SigninForm = () => {
   
    const navigate = useNavigate();
    const [loginEmail , setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [emailError , setEmailError] = useState('');
    const [passwordError , setPasswordError] = useState('');
    

    function isValidEmail(loginEmail){
        const regex =  /\S+@\S+\.\S+/;
        return regex.test(loginEmail);
       
    }

    const validateLogin  = () => {
        let errorCount = 0;
        if(loginEmail === ''){
            setEmailError('Email is required');
            errorCount++;
        }else if(!isValidEmail(loginEmail)){
            setEmailError('Email is not valid');
            errorCount++;
        }else{
            setEmailError('');
        }
        if(loginPassword === ''){
            setPasswordError('Password is required');
            errorCount++;
        }else{
            setPasswordError('');
        }

        if(errorCount > 0){
            return false;
        }

        else{
            return true;
        }

    }

    const signupPressed = () => {
        navigate('/signup');
    }
    const homePressed =() => {
        navigate('/');
    }
    
    const signIn =  (e) => {
        if(e){
        e.preventDefault();
        }
        if(!validateLogin()){
            console.log("Cannot Login")

        }else{
            console.log("Successful Login")
        }
        
       
    }

    return (  
        <div className="bg-white px-10  py-15 rounded-3xl border-2 border-gray-200"> 
            <div className="flex justify-center">
                <button onClick ={homePressed}>
            <img src ={logo} alt="logo" className="flex w-40 h-40 justify-content-center"/>
            </button>
            </div>
            <p className="font-medium text-lg text-gray-500 mt-2">Please enter your details!</p>
            <div className="mt-8"> 
                <label className="txt-lg font-medium">Email </label>
                <input onChange = {(e) => {setLoginEmail(e.target.value)}} value = {loginEmail} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" id="email" type="email" placeholder="Enter your email"  required />
                <div className = "text-red-500 text-sm-medium">{emailError}</div>
            </div>
            <div className="mt-8"> 
                <label className="txt-lg font-medium">Password </label>
                <input onChange = {(e) => {setLoginPassword(e.target.value)}} value = {loginPassword} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" id="pass" type="password" placeholder="Enter your password"  required />
                <div className="text-red-500 text-sm-medium">{passwordError} </div>
            </div>
            <div className="mt-8 flex justify-between items-center"> 
                <div > 
                    <input type="checkbox" id="remember"/> 
                    <label className="ml-2 font-medium text-base mx-2">Remember me for 30 days</label>
                    
                   
                </div>
                
                
                </div>
                <div className="mt-8 flex flex-col gap-y-3">
                    <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold" onClick={signIn}>Sign in </button>

                    <button className="flex rounded-3xl py-2 border-2 border-gray-200 item-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all"><FcGoogle/>Sign in with Google </button>
                    <button className="font-medium text-base text-violet-500"> Forgot Password?</button>
                </div>
                <div className="mt-1 flex justify-center items-center"> 
                    <p className="font-medium text-base">Don't have an account?</p>
                    <div className="mb-1 py-2 flex justify-center mt-1">
                    <button className="text-violet-500 text-base font-medium ml-2 py-px" onClick={signupPressed}> Signup </button>
                    </div>
                </div>
            
        </div>
    );
}
 
export default SigninForm;