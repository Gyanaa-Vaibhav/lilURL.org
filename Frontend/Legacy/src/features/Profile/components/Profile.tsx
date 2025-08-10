import '../styles/Profile.css';
import {useEffect, useState} from "react";
import {SideNav} from "../../SideNav/components/SideNav.tsx";

const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/get/user` : "/get/user";

type linkDataType = {
    createdat:string;
    expiresat:string;
    linkid:number;
    longurl:string;
    shorturl:string;
    userid:number;
}
export function Profile() {

    const [userDatails,setUserDetails] = useState<{username:string,email:string,createdAt:string}>({
        createdAt: "",
        email: "",
        username: ""
    })

    const [linkList,setLinkList] = useState<linkDataType[]>([]);

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
            .then(d => {
                setLinkList(d.linkData)
                setUserDetails({username:d.userData.username, email:d.userData.email, createdAt:d.userData.createdAt})
            })
    }, []);
    return (
        <>
            <div className='profile'>
                <SideNav/>
                <div className='profile-container'>
                    <h2 className='userName'>Welcome {userDatails.username}</h2>
                    <h3 className='userEmail'>Email: {userDatails.email}</h3>
                    <h3 className='userCreatedAt'>Account Opening: {new Date(userDatails.createdAt).toDateString()}</h3>
                    <div className='linkList'>
                        <MyTable inputData={linkList}/>
                    </div>
                </div>
            </div>

        </>
    );
}


type MyTableProps = {
    inputData: linkDataType[];
};

function MyTable({ inputData }: MyTableProps) {
    const filter = inputData.map(d => {
        const {createdat,expiresat, longurl,linkid,shorturl} = d
        return {
            linkid,longurl,shorturl,
            createdat:new Date(createdat).toDateString(),
            expiresat: expiresat ? new Date(expiresat).toDateString() : null,
        };
    })

    if (!inputData || inputData.length === 0) return null;
    return (
        <table>
            <thead>
            <tr>
                {Object.keys(filter[0]).map((key) => {
                    return (<th key={key}>{key}</th>)
                })}
            </tr>
            </thead>
            <tbody>
            {filter.map((row, index) => {
                 return (<tr key={index}>
                    {Object.values(row).map((value, index2) => {
                        return (<td key={index2}>{String(value)}</td>)
                    })}
                </tr>)
            })}
            </tbody>
        </table>
    );
}
