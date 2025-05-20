import QRCodeStyling, {CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel, Options} from 'qr-code-styling';
import { SideNav } from '../../SideNav/components/SideNav';
import '../styles/UpdateQR.css';
import React, {useEffect, useState} from 'react';
const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/update/qr` : "/update/qr";
const getUrl = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/get/qr` : "/get/qr";

export function UpdateQR() { 
    
    const qrRef = React.useRef<HTMLDivElement | null>(null)
    const [options, setOptions] = useState<Options | null>(null);

    const qrCode = React.useMemo(() => new QRCodeStyling({
        width: 200,
        height: 200,
        type: "canvas",
        data: "https://www.google.com",
        margin: 0,
        image: "", // can be null if no image is needed
        dotsOptions: {
            color: "#000000",
            type: "square"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 0.5,
            imageSize: 0.7
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        qrOptions: {
            typeNumber: 0,
            mode: "Byte",
            errorCorrectionLevel: "H"
        },
        cornersSquareOptions: {
            color: "#000",
            type: "extra-rounded"
        },
        cornersDotOptions: {
            color: "#000",
            type: "dot"
        },
    }), []);

    function uploadQrSettings(){
        console.log(qrCode._options)
        fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({qrOptions:qrCode._options})
        }).then((response) => response.json()).then((data) => console.log(data))
    }

    useEffect(() => {
        if (!qrRef.current) {
           return
        }
        
        qrRef.current.innerHTML = '';
        qrCode.append(qrRef.current)

    }, [qrCode])

    useEffect(() => {

        document.title = "Update Settings | lilURL"

        fetch(getUrl,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        })
            .then(r => r.json())
            .then((data) => {
                const options = JSON.parse(data.qr_options);
                qrCode.update(options);
                setOptions(options);
                })
    }, []);

    return (
        <>
            <div className="updateQR">
                <SideNav />
                <div className='holder'>
                    <h1>Update QR</h1>
                    <div className='qrUpdateHolder'>
                        <div className="options">
                        <div className="option-row">
                            <label>
                                Dot Style:
                                <select
                                    onChange={(e) =>
                                        qrCode.update({ dotsOptions: { ...qrCode._options.dotsOptions, type: e.target.value as DotType } })
                                    }
                                    // defaultValue={qrCode._options.dotsOptions?.type}
                                    value={options?.dotsOptions?.type}
                                >
                                    <option value="square">Square</option>
                                    <option value="dots">Dots</option>
                                    <option value="rounded">Rounded</option>
                                    <option value="extra-rounded">Extra Rounded</option>
                                    <option value="classy">Classy</option>
                                    <option value="classy-rounded">Classy Rounded</option>
                                </select>
                            </label>
                            <label>
                                Dot Color:
                                <input
                                    type="color"
                                    defaultValue={qrCode._options.dotsOptions?.color}
                                    value={options?.dotsOptions?.color}
                                    onChange={(e) =>
                                        qrCode.update({ dotsOptions: { ...qrCode._options.dotsOptions, color: e.target.value } })
                                    }
                                />
                            </label>
                        </div>
                        <div className="option-row">
                            <label>
                                Corner Dot Style:
                                <select
                                    onChange={(e) =>
                                            qrCode.update({ cornersDotOptions: { ...qrCode._options.cornersDotOptions, type: e.target.value as CornerDotType } })
                                    }
                                        // defaultValue={qrCode._options.cornersDotOptions?.type}
                                    value={options?.cornersDotOptions?.type}
                                >
                                    <option value="square">Square</option>
                                    <option value="dot">Dot</option>
                                    <option value="dots">Dots</option>
                                </select>
                            </label>
                            <label>
                                Corner Dot Color:
                                <input
                                    type="color"
                                    // defaultValue={qrCode._options.cornersDotOptions?.color}
                                    value={options?.cornersDotOptions?.color}
                                    onChange={(e) =>
                                        qrCode.update({ cornersDotOptions: { ...qrCode._options.cornersDotOptions, color: e.target.value } })
                                    }
                                />
                            </label>
                        </div>
                        <div className="option-row">
                            <label>
                                Corner Style:
                                <select
                                    onChange={(e) =>
                                        qrCode.update({ cornersSquareOptions: { ...qrCode._options.cornersSquareOptions, type: e.target.value as CornerSquareType} })
                                    }
                                    // defaultValue={qrCode._options.cornersSquareOptions?.type}
                                    value={options?.cornersSquareOptions?.type}
                                >
                                    <option value="square">Square</option>
                                    <option value="dot">Dot</option>
                                    <option value="extra-rounded">Extra Rounded</option>
                                </select>
                            </label>
                            <label>
                                Corner Color:
                                <input
                                    type="color"
                                    onChange={(e) =>
                                        qrCode.update({ cornersSquareOptions: { ...qrCode._options.cornersSquareOptions, color: e.target.value } })
                                    }
                                    // defaultValue={qrCode._options.cornersSquareOptions?.color}
                                    value={options?.cornersSquareOptions?.color}
                                />
                            </label>
                        </div>
                        <label>
                            Background Color:
                            <input
                                type="color"
                                onChange={(e) =>
                                    qrCode.update({ backgroundOptions: { ...qrCode._options.backgroundOptions, color: e.target.value } })
                                }
                                // defaultValue={qrCode._options.backgroundOptions?.color}
                                value={options?.backgroundOptions?.color}
                            />
                        </label>
                        <label>
                            Error Correction Level:
                            <select
                                onChange={(e) =>
                                    qrCode.update({ qrOptions: { ...qrCode._options.qrOptions, errorCorrectionLevel: e.target.value as ErrorCorrectionLevel } })
                                }
                                // defaultValue={qrCode._options.qrOptions?.errorCorrectionLevel}
                                value={options?.qrOptions?.errorCorrectionLevel}
                            >
                                <option value="L">L (Low)</option>
                                <option value="M">M (Medium)</option>
                                <option value="Q">Q (Quartile)</option>
                                <option value="H">H (High)</option>
                            </select>
                        </label>
                        <label>
                            Upload Logo (PNG/JPEG, &lt;1MB):
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    if (file.size > 1024 * 1024) {
                                        alert("File size exceeds 1MB.");
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        qrCode.update({
                                            image: reader.result as string
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                        </label>
                        </div>
                        <div className='qrCode'>
                            <button
                                className='remove-image'
                                onClick={()=>{
                                    qrCode.update({ image: "" });
                                    setOptions(prev => prev ? { ...prev, image: "" } : null);
                                }}
                            >Remove Image</button>
                            <button onClick={uploadQrSettings} className='uploadSettings'>Upload Settings</button>
                            <div  ref={qrRef}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
