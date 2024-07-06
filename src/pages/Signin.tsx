import { useEffect, useState } from "react";
import { SigninInput } from "@hashnj/blobx-common";
import { Quote } from "../components/Quote";
import { FloatingLabelInput } from '../components/FloatingLabelInput';
import { useNavigate } from "react-router-dom";
import { Backend_Url } from "../config";
import { ToastContainer, toast } from "react-toastify";
import { Getdata } from "../hooks";

export const Signin = () => {
    const nav = useNavigate();
    const [inputs, setInputs] = useState<SigninInput>({
        username: "",
        password: ""
    });

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { user, loading } = Getdata();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        if (token && tokenExpiry) {
            const now = new Date().getTime();
            if (now > parseInt(tokenExpiry)) {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
            } else if (user) {
                toast.info('Signed in');
                setTimeout(() => {
                    nav('/');
                }, 500);
            }
        }
    });

    useEffect(() => {
        setInputs({
            username: email,
            password: password,
        });
    }, [email, password]);

    const validate = (v: string) => {
        const emailRegex = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        return emailRegex.test(v);
    }

    const handleSubmit = async () => {
        console.log(inputs);
        if (validate(inputs.username)) {
            if(inputs.password.length<6){
            toast.error('Password');

            }
            try {
                const data = await fetch(`${Backend_Url}/api/v1/user/signin`, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputs)
                });
                const res = await data.json();
                console.log(res);
                if(res.token){
                const tokenExpiry = new Date().getTime() + (60*60*1000); 
                localStorage.setItem('token', res.token);
                localStorage.setItem('tokenExpiry', tokenExpiry.toString());
                
                nav('/');
                }
            } catch (e: any) {
                console.log(e);
                toast.error('Not registered');
            }
        } else {
            toast.error('Invalid Email Format');
        }
    }

    if (loading) {
        nav('/');
    } else {
        return (
            <>
                <ToastContainer position="bottom-right" />
                <div className="flex w-screen h-screen transition-all duration-300 ease-in-out bg-yellow-900 lg:bg-white">
                    <div className="flex justify-center items-center flex-col w-full lg:w-screen h-full bg-yellow-900 text-yellow-100 transition-all duration-300 ease-in-out">
                        <h1 className="text-5xl font-extrabold font-serif pb-12">Sign-in</h1>
                        <FloatingLabelInput label="Email" type="email" id="email" name="username" fn={setEmail} />
                        <FloatingLabelInput label="Password" type='password' id='password' name='password' fn={setPassword} />
                        <button className="but" onClick={handleSubmit}>Signin</button>
                        <button onClick={() => { nav('/signup') }} className="pt-4 underline hover:text-yellow-500">Register</button>
                    </div>
                    <div className="w-0 lg:w-full opacity-0 lg:opacity-100 flex justify-center items-center transition-all duration-500 ease-out"><Quote /></div>
                </div>
            </>
        );
    }
}
