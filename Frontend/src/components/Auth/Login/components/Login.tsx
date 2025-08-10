import '../styles/Login.css';
import * as React from "react";
import {ShowPasswordIconButton} from "./ShowPasswordIconButton.tsx";
import OAuth from "./OAuth.tsx";
import {validateInput} from "../utils/validateInput.ts";
const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/auth/login` : "/auth/login";

export default function Login() {
    const emailRef = React.createRef<HTMLInputElement>()
    const passwordRef = React.createRef<HTMLInputElement>()
    const [email,setEmail] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [showPasswordButton,setShowPasswordButton] = React.useState<boolean>(false)
    const [errors,setErrors] = React.useState<{email?:string,password?:string}>({})
    const [showingPassword, setShowingPassword] = React.useState<boolean>(true)
    const [errorDialog, setErrorDialog] = React.useState('');

    React.useEffect(()=>{
        if(password.length > 0) {
            setShowPasswordButton(true)
        }else {
            setShowPasswordButton(false)
        }
    },[password])

    function handelSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        // Submit Logic
        const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!isValidEmail(email)){
            setErrors(prev => ({email:"Please Enter a Valid Email Address", password:prev.password}))
            return;
        }
        if(!password || !email) {
            if(!password) setErrors(prev => ({email:prev.email, password:"Please enter your password"}))
            if(!email) setErrors(prev => ({email:"Please enter your email address", password:prev.password}))
            return
        }
        setErrors({})
        fetch(url,({
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email:email,password:password}),
            credentials: "include"
        }))
            .then((res)=>res.json())
            .then((res) => {
                console.log(res)
                if (!res.success) {
                    setErrorDialog(res.message)
                    return
                }
                if (res.success) {
                    setErrorDialog('')
                    localStorage.setItem('accessToken', res.accessToken)
                    localStorage.setItem('username', res.username)
                    window.location.href = '/dashboard'
                }
            })
    }

    return (
        <>
            <nav className="loginNav">
                <div><a id="lilurl" href="/URL-Shortener/Frontend/public">lilurl</a></div>
            </nav>
            <div className="loginModal">
                <form onSubmit={event => handelSubmit(event)}>
                    <div className="loginHeader">
                        <h1>Log in and start sharing</h1>
                        <p className="">Don't have an account? <a href="/sign-up" className="">Sign Up</a></p>
                    </div>

                    {errorDialog &&
                        <div className='errorDialog'>
                            {errorDialog}
                        </div>
                    }
                    <div className='loginOptions'>
                        <div className="manualLogin">
                            <div style={{position:"relative"}}>
                                <label>
                                    <div>Email</div>
                                    <input
                                        style={{borderColor: `${errors.email ? 'red' : 'black'}`}}
                                        onInput={(e) => {
                                            setEmail((e.target as HTMLInputElement).value)
                                        }}
                                        ref={emailRef}
                                        aria-invalid="false"
                                        aria-required="true"
                                    />
                                    {errors.email && <small>{errors.email}</small> }
                                </label>
                        </div>
                            <div>
                                {showPasswordButton &&
                                    <ShowPasswordIconButton
                                        showingPassword={showingPassword}
                                        setShowingPassword={setShowingPassword}
                                    />
                                }
                                <label>
                                    <div>Password</div>
                                    <input
                                        style={{borderColor: `${errors.email ? 'red' : 'black'}`}}
                                        ref={passwordRef}
                                        aria-invalid="false"
                                        aria-required="true"
                                        type={`${!showingPassword ? "text" : "password"}`}
                                        maxLength={256}
                                        onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                                    />
                                    {errors.password && <small>{errors.password}</small> }
                                </label>
                            </div>
                            <a href="/forgot_password" className="forgotPassword">Forgot your password?</a>
                            <button type="submit" className="loginButton">Log in</button>
                        </div>

                        <div aria-hidden="true" className="or">or</div>
                        <OAuth/>
                    </div>
                </form>
            </div>
        </>
    );
}