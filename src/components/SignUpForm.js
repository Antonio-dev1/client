import { useEffect, useState } from "react";
import logo from '../assets/imgs/logo.png'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
    const navigate = useNavigate();
    const[firstName , setFirstName] = useState('');
    const[errorFirstName , setErrorFirstName] = useState('');
    const[lastName , setLastName] = useState('');
    const[errorLastName , setErrorLastName] = useState('');
    const [userEmail , setUserEmail] = useState('');
    const[errorUserEmail , setErrorUserEmail] = useState('');
    const[password , setpassword] = useState('');
    const[errorPassword , setErrorPassword] = useState('');
    const[confirmedPassword , setconfirmedPassword] = useState('');
    const[errorConfirmedPassword , setErrorConfirmedPassword] = useState('');
    const[signupStatus , setSignupStatus] = useState('');
    const[signUpFailed , setSignUpFailed] = useState('');
    const [loadingSuccess , setLoadingSuccess] = useState(false);

    function isValidEmail(loginEmail){
        const regex =  /\S+@\S+\.\S+/;
        return regex.test(loginEmail);
       
    }

    const validateSignUpForm = () =>{
        let errorCount = 0;
        if(firstName === ''){
            setErrorFirstName('First Name is required');
            errorCount++;
        }else{
            setErrorFirstName('');
        }
        if(lastName === ''){
            setErrorLastName('Last Name is required');
            errorCount++;
        }else{
            setErrorLastName('');
        }
        if(userEmail === ''){
            setErrorUserEmail('Email is required');
            errorCount++;
        }else if(!isValidEmail(userEmail)){
            setErrorUserEmail('Email is not valid');
            errorCount++;
        }else{
            setErrorUserEmail('');
        }
        if(password === ''){
            setErrorPassword('Password is required');
            errorCount++;
        }else{
            setErrorPassword('');
        }
        if(confirmedPassword === ''){
            setErrorConfirmedPassword('Confirmed Password is required');
            errorCount++;
        }else{
            setErrorConfirmedPassword('');
        }
        if(confirmedPassword!==password){
            setErrorConfirmedPassword('Passwords do not match');
            errorCount++;
        }
        else{
            setErrorConfirmedPassword('');
        }
        if(errorCount > 0){
            return false;
        }

        else{
            return true;
        }
    }

    function loginPressed(e) {
        if(e){
            e.preventDefault();
        }
        navigate('/signin');
    }

    const signUpPressed = (e) => {
        if(e){
            e.preventDefault();
        }
            if(!validateSignUpForm()){
                console.log("Cannot Sign up")
            }

            else{
                axios.post('http://localhost:3001/api/users/' , {
                    fullName : firstName + " " + lastName,
                    email: userEmail,
                    password: password,
                }).then((response) => {
                    setSignupStatus('Successfully signed up')
                }).catch((err) =>{
                    setSignUpFailed('User already exists');
                });
            }
        
    }

    useEffect(() => {
        if(signupStatus == 'Successfully signed up'){
            setTimeout(() => {
                return navigate('/signin');
            } , 1000)
        }
    } , [signupStatus])




    return (  
        <div className="bg-white px-20  py-15 rounded-3xl border-2 border-gray-200"> 
            <div className="flex justify-center">
            <img src ={logo} alt="logo" className="flex w-40 h-40 justify-content-center"/>
            </div>
            <p className="flex justify-center font-bold text-lg text-gray-500 mb-2 ">Signup!</p>
            <div className="mt-2"> 
                <input onChange={(e) => {setFirstName(e.target.value)}} value={firstName} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="text" placeholder="First Name"   required />
                <div className="text-red-500 text-sm-medium"> {errorFirstName}</div>
            </div>
            <div className="mt-1"> 
                <input onChange={(e) => {setLastName(e.target.value)}} value={lastName}  className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="text" placeholder="Last Name" required />
                <div className="text-red-500 text-sm-medium"> {errorLastName}</div>
            </div>
            <div className="mt-1"> 
                <input onChange = {(e) => {setUserEmail(e.target.value)}} value={userEmail}  className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="text" placeholder="Email" required />
                <div className="text-red-500 text-sm-medium"> {errorUserEmail}</div>
                <div className="text-red-500 text-sm-medium"> {signUpFailed} </div>
            </div>
            <div className="mt-1"> 
                <input onChange = {(e) => {setpassword(e.target.value)}} value={password} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="password" placeholder="password"  required />
                <div className="text-red-500 text-sm-medium"> {errorPassword}</div>
            </div>
            <div className="mt-1"> 
                <input onChange = {(e) => {setconfirmedPassword(e.target.value)}} value={confirmedPassword} className ="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"  type="password" placeholder="Retype password"  required />
                <div className="text-red-500 text-sm-medium"> {errorConfirmedPassword}</div>
                <div className="text-green-500 text-sm-medium"> {signupStatus} </div>
            </div>
        
                <div className="mt-6 flex flex-col ">
                    <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold" onClick = {(e)=> signUpPressed(e) }>Sign Up </button>
                </div>
                <div className="mt-1 flex justify-center items-center"> 
                    <p className="font-medium text-base">Already Have an Account?</p>
                    <div className="mb-1 py-2 flex justify-center mt-1">
                    <button className="text-violet-500 text-base font-medium ml-2 py-px" onClick={(e) => loginPressed(e)}> Log in </button>
                    </div>
                    </div>
            
        </div>
    );
}
 
export default SignUpForm;