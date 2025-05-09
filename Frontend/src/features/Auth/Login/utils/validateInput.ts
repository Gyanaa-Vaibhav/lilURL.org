import * as React from "react";

type ValidateInputType = {
    name: "Email" | "Password",
    email:string,
    password:string,
    setErrors:  React.Dispatch<React.SetStateAction<{email?: string,password?: string }>>,
    setPasswordRequirements: React.Dispatch<React.SetStateAction<{
        oneLetter: boolean
        oneNumber: boolean
        oneSpecial: boolean
        nineORMore: boolean
    }>>
}

export function validateInput({
                                  setErrors,
                                  name,
                                  email,
                                  password,
                                  setPasswordRequirements,
                              }: ValidateInputType) {
    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const oneLetter = /[a-zA-Z]/.test(password);
    const oneNumber = /\d/.test(password);
    const oneSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const nineORMore = password.length >= 9;

    if (name === "Password") {
        setPasswordRequirements({
            oneLetter,
            oneNumber,
            oneSpecial,
            nineORMore,
        });

        const isStrongPassword =
            oneLetter && oneNumber && oneSpecial && nineORMore;

        if (!isStrongPassword) {
            setErrors((prev) => ({
                ...prev,
                password:
                    "Password must be 9+ chars, include a letter, number, and special character",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                password: "",
            }));
        }
    }

    if (name === "Email") {
        if (!isValidEmail(email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email address",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                email: "",
            }));
        }
    }
}