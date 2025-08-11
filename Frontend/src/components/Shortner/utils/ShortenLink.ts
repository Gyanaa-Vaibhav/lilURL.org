const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/free/link` : "/free/link";

export default async function ShortenLink({longLink}:{longLink:string}) {
    const res = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            longLink: longLink,
        })
    })
    return await res.json();
}