type ValidateInputType = {
    name: "Email" | "Password",
    email:string,
    password:string,
    setErrors:  React.Dispatch<React.SetStateAction<{email?: string,password?: string }>>
}

export function validateInput({setErrors, name, email, password}:ValidateInputType){
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isStrongPassword = (password: string) => password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
    if(name === 'Email') {
        if(!isValidEmail(email)){
            setErrors(prev => {
                return {
                    ...prev ,
                    email:'Please enter a valid email address'
                }
            })
            return;
        }else{
            setErrors(prev => {
                return {
                    ...prev,
                    email:''
                }
            })
        }
    }
    if(name === "Password") {
        if(!isStrongPassword(password)){
            setErrors(prev => {
                return {
                    ...prev ,
                    password:'Password must be 8+ chars, include uppercase & number'
                }
            })
        }else{
            setErrors(prev => {
                return {
                    ...prev,
                    password:''
                }
            })
        }
    }
}