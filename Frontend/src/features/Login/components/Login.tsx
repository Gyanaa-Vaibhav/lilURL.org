import '../styles/Login.css';
import * as React from "react";
import {ShowPasswordIconButton} from "./ShowPasswordIconButton.tsx";
import {validateInput} from "../utils/validateInput.ts";

const Login = () => {

    const emailRef = React.createRef<HTMLInputElement>()
    const passwordRef = React.createRef<HTMLInputElement>()
    const [email,setEmail] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [showPasswordButton,setShowPasswordButton] = React.useState<boolean>(false)
    const [showingPassword,setShowingPassword] = React.useState<boolean>(true)
    const [errors,setErrors] = React.useState<{ email?: string; password?: string }>({});

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
    }

    return (
        <>
            <nav className="loginNav">
                <div><a id="lilurl" href="/">lilurl</a></div>
            </nav>
            <div className="loginModal">
                <form onSubmit={event => handelSubmit(event)}>
                    <div className="loginHeader">
                        <h1>Log in and start sharing</h1>
                        <p className="">Don't have an account? <a href="/sign_up" className="">Sign Up</a></p>
                    </div>

                    <div className='loginOptions'>
                        <div className="manualLogin">
                            <div style={{position:"relative"}}>
                                <label>
                                    <div>Email</div>
                                    <input
                                        style={{borderColor: `${errors.email ? 'red' : 'black'}`}}
                                        onBlur={() => validateInput({setErrors, name:"Email", email, password})}
                                        onInput={(e) => {
                                            setEmail(e.target.value)
                                            validateInput({setErrors, name:"Email", email, password})
                                        }}
                                        ref={emailRef}
                                        aria-invalid="false"
                                        aria-required="true"
                                    />
                                    {errors.email && <small>{errors.email}</small>}
                                </label>
                                {email && !errors.email &&
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                      className="greenTick" height="1em" width="1em"
                                      xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                </svg>}
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
                                        style={{borderColor: `${errors.password ? 'red' : 'black'}`}}
                                        onBlur={() => validateInput({setErrors, name:"Password", email, password})}
                                        ref={passwordRef}
                                        aria-invalid="false"
                                        aria-required="true"
                                        type={`${!showingPassword ? "text" : "password"}`}
                                        maxLength={256}
                                        onInput={(e) => {
                                            setPassword(e.target.value)
                                            validateInput({setErrors, name:"Password", email, password})
                                        }}
                                    />
                                    {errors.password && <small>{errors.password}</small>}
                                </label>
                            </div>
                            <a href="/forgot_password" className="forgotPassword">Forgot your password?</a>
                            <button type="submit" className="loginButton">Log in</button>
                        </div>

                        <div aria-hidden="true" className="or">or</div>
                        <div className="oAuth">
                            <a href="/auth/google" data-testid="google-button" className="google">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                                        <path fill="#2A5BD7"
                                              d="M15.078 15.625c1.758-1.64 2.54-4.375 2.07-6.992h-6.992v2.89h3.985c-.157.938-.703 1.72-1.485 2.227z"></path>
                                        <path fill="#34A853"
                                              d="M3.516 13.32a7.5 7.5 0 0 0 11.562 2.305l-2.422-1.875c-2.07 1.367-5.508.86-6.68-2.344z"></path>
                                        <path fill="#FBBC02"
                                              d="M5.975 11.406a4.45 4.45 0 0 1 0-2.851L3.515 6.64c-.9 1.797-1.173 4.336 0 6.68z"></path>
                                        <path fill="#EA4335"
                                              d="M5.977 8.555c.859-2.696 4.53-4.258 6.992-1.954l2.148-2.109C12.07 1.562 6.133 1.68 3.516 6.641z"></path>
                                    </svg>
                                    Continue with Google
                                </span>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
