import React from "react";
import '../../Login/styles/Login.css';
import {validateInput} from "../../Login/utils/validateInput.ts";
import {ShowPasswordIconButton} from "../../Login/components/ShowPasswordIconButton.tsx";
import PasswordErrors from "./PasswordErrors.tsx";
import OAuth from "../../Login/components/OAuth.tsx";
const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/auth/sign-up` : "/auth/sign-up";

export default function SignUpComponent() {
    const emailRef = React.createRef<HTMLInputElement>()
    const passwordRef = React.createRef<HTMLInputElement>()
    const [email,setEmail] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [showPasswordButton,setShowPasswordButton] = React.useState<boolean>(false)
    const [showingPassword,setShowingPassword] = React.useState<boolean>(true)
    const [errors,setErrors] = React.useState<{ email?: string; password?: string }>({});
    const [passwordRequirements,setPasswordRequirements] = React.useState<{oneLetter:boolean,oneNumber:boolean,oneSpecial:boolean,nineORMore:boolean}>({
        nineORMore: false,
        oneLetter: false,
        oneNumber: false,
        oneSpecial: false
    });
    const [errorDialog, setErrorDialog] = React.useState('');


    React.useEffect(()=>{
        if(password.length > 0) {
            setShowPasswordButton(true)
        }else {
            setShowPasswordButton(false)
        }
    },[password])

    function handelSubmit(e: React.FormEvent<HTMLFormElement>){
        validateInput({setErrors, name:"Email", email, password,setPasswordRequirements})
        validateInput({setErrors, name:"Password", email, password,setPasswordRequirements})
        e.preventDefault()
        // Submit Logic
        if (!errors.email && !errors.password) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password }),
                credentials: 'include',
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    if (!res.success) {
                    setErrorDialog(res.message)
                    return
                }
                    localStorage.setItem("accessToken", res.token)
                    window.location.href = '/dashboard';
                });
        }

    }

    return (
        <>
            <nav className="loginNav">
                <div><a id="lilurl" href="/URL-Shortener/Frontend/public">lilurl</a></div>
            </nav>
            <div className="loginModal">
                <form onSubmit={event => handelSubmit(event)}>
                    <div className="loginHeader">
                        <h1>Create your account</h1>
                        <p className="">Already have an account? <a href="/sign-in" className="">Log in</a></p>
                    </div>

                    {errorDialog &&
                        <>
                            <div className='errorDialog'>
                                {errorDialog}
                            </div>
                        </>
                    }
                    <div className='loginOptions'>
                        <div className="manualLogin">
                            <div style={{position:"relative"}}>
                                <label>
                                    <div>Email</div>
                                    <input
                                        style={{borderColor: `${errors.email ? 'red' : 'black'}`}}
                                        onBlur={() => validateInput({setErrors, name:"Email", email, password,setPasswordRequirements})}
                                        onInput={(e) => {
                                            setEmail((e.target as HTMLInputElement).value)
                                            validateInput({setErrors, name:"Email", email, password,setPasswordRequirements})
                                        }}
                                        ref={emailRef}
                                        aria-invalid="false"
                                        aria-required="true"
                                    />
                                    {errors.email && <small>{errors.email}</small> }
                                </label>
                                {email && !errors.email &&
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                         className="greenTick" height="1em" width="1em"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                    </svg>
                                }
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
                                        onBlur={() => validateInput({setErrors, name:"Password", email, password,setPasswordRequirements})}
                                        ref={passwordRef}
                                        aria-invalid="false"
                                        aria-required="true"
                                        type={`${!showingPassword ? "text" : "password"}`}
                                        maxLength={256}
                                        onInput={(e) => {
                                            const newPassword = (e.target as HTMLInputElement).value;
                                            setPassword(newPassword);
                                            validateInput({ setErrors, name: "Password", email, password: newPassword, setPasswordRequirements });
                                        }}
                                    />
                                    {showPasswordButton}
                                    {errors.password &&
                                        <PasswordErrors passwordRequirements={passwordRequirements} />
                                    }
                                </label>
                            </div>
                            <button type="submit" className="loginButton">Create a account for free</button>
                        </div>

                        <div aria-hidden="true" className="or">or</div>
                        <OAuth/>
                    </div>
                </form>
            </div>
        </>
    );
}

