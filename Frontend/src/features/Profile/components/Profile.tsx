import '../styles/Profile.css';
import {useEffect} from "react";
import {SideNav} from "../../SideNav/components/SideNav.tsx";

const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/get/user` : "/get/user";

export function Profile() {



    useEffect(() => {
        document.title = "Profile | lilURL"

        fetch(url,{
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(r => r.json())
            .then(d => console.log(d))
    }, []);
    return (
        <>
            <div className='profile'>
                <div className='sideNav-container'>
                    <SideNav/>
                </div>
                <div className=''>

                </div>
            </div>

        </>
    );
}
