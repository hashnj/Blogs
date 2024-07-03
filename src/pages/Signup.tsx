import { SignupInput } from "@hashnj/blobx-common"; 
import { useEffect, useState } from "react";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { Quote } from "../components/Quote";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Backend_Url } from "../config";
import { Getdata } from "../hooks";

export const Signup = () => {
    const nav = useNavigate();
    const [inputs, setInputs] = useState<SignupInput>({
        username: "",
        password: '',
        name: ''
    });
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {user,loading}=Getdata();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            if(user){
                toast.info('signed-In')
                setTimeout(() => {
                    nav('/');
                }, 500);
            }
        }
        else{
            return;
        }
        
    })

    useEffect( () => {
        setInputs({
            username: email,
            password: password,
            name: name
        });
    },[name,email,password])

    const validate=(v:string)=>{
        const emailRegex = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
         );
         if(emailRegex.test(v)){
            return true;
         }
         return false;
    }

    const handleSubmit = async () => {
        if(validate(inputs.username)){
            try{
        const data = await fetch(`${Backend_Url}/api/v1/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        });
        const res = await data.json();
        console.log(res);
        const tokenExpiry = new Date().getTime() + (60*60*1000); 
        localStorage.setItem('token', res.token);
        localStorage.setItem('tokenExpiry', tokenExpiry.toString());
        if(res.error=='error while signing up'){
            toast.error('already signed up')
            nav('/signup');
        }
        else{
            toast.success('signedup')
            localStorage.setItem('token',res.token)
            nav('/');
        }
    }
    catch(e){
        console.log(e);
    }
    }
    else{
        toast.error('Invalid Email Format');
    }
    };

    if(loading){
        nav(-1);
    }
    else{

    return (
        <div className="flex w-screen h-screen transition-all  duration-300 ease-out">
            <ToastContainer position="bottom-right" autoClose={1000} />
            <div className="w-0 lg:w-full flex justify-center items-center transition-all duration-500 ease-out">
                <Quote />
            </div>
            <div className="flex  justify-center items-center flex-col w-full lg:w-screen h-full bg-yellow-900 text-yellow-100 transition-all duration-300 ease-in-out">
            <h1 className="text-5xl font-extrabold font-serif pb-12">Sign-up</h1>
                <FloatingLabelInput label="Username" id="username" name='username' fn={setName} />
                <FloatingLabelInput label="Email" type="email" id="email" name="email" fn={setEmail} />
                <FloatingLabelInput label="Password" type='password' id='password' name='password' fn={setPassword}/>
                <button className="but mt-4" onClick={handleSubmit}>Sign up</button>
                <button onClick={() => { nav('/signin') }} className="pt-4 underline hover:text-yellow-500">Log-in</button>
            </div>
        </div>
    );
}};

export default Signup;
