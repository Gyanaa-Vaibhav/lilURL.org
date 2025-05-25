import '../styles/CreateLink.css';
import {SideNav} from "../../SideNav/components/SideNav.tsx";

// const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/get/link` : "/get/link";

export function CreateLink () {
    return (
        <>
            <div className='createLink'>
                <SideNav />
            </div>
        </>
    );
}
