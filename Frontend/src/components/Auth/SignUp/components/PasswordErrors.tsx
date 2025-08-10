import {correct} from "../../Login/components/correct.tsx";
import {wrong} from "../../Login/components/wrong.tsx";
import React from "react";

type passwordRequirements = {
    passwordRequirements: {
        oneLetter:boolean,
        oneNumber: boolean,
        oneSpecial: boolean,
        nineORMore: boolean
    }
}

export default function PasswordErrors(passwordRequirements:passwordRequirements){
    return(
        <>
            <small>
                <ul id="passwordErrors">
                    <li style={{ color: passwordRequirements.oneLetter ? "green" : undefined }}>
                        {passwordRequirements.oneLetter ? correct() : wrong()} One letter
                    </li>
                    <li style={{ color: passwordRequirements.oneNumber ? "green" : undefined }}>
                        {passwordRequirements.oneNumber ? correct() : wrong()} One Number
                    </li>
                    <li style={{ color: passwordRequirements.oneSpecial ? "green" : undefined }}>
                        {passwordRequirements.oneSpecial ? correct() : wrong()} One special character
                    </li>
                    <li style={{ color: passwordRequirements.nineORMore ? "green" : undefined }}>
                        {passwordRequirements.nineORMore ? correct() : wrong()} 9 or more characters
                    </li>
                </ul>
            </small>
        </>
    )
}