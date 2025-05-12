const refreshURL = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/refreshToken` : "/refreshToken";
const initialURL = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/a/check-login` : "/a/check-login";

export async function fetchWithAuth(url: string) {
    const token = localStorage.getItem('accessToken');
    return await fetch(url,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function initialFetch() {
    const token = localStorage.getItem('accessToken');
    const data = await fetch(initialURL,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    const extractData = await data.json();
    console.log(extractData);
    if(extractData.success === false){
        const refresh = await fetch(refreshURL,{
            credentials:'include',
        })

        const refreshData = await refresh.json();
        if(refreshData.success === false){
            // window.location.href = '/sign-in'
            console.log("failed")
        }

        const newAccessToken = refreshData?.token
        localStorage.setItem('accessToken',newAccessToken)
    }

    return true;
}