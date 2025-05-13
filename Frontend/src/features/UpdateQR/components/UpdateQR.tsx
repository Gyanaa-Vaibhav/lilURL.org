import QRCodeStyling from 'qr-code-styling';
import { SideNav } from '../../SideNav/components/SideNav';
import '../styles/UpdateQR.css';
import React, { useEffect } from 'react';

export function UpdateQR() { 
    
    const qrRef = React.useRef<HTMLDivElement | null>(null)

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

    useEffect(() => {
        if (!qrRef.current) {
           return
        }
        
        qrRef.current.innerHTML = '';
        qrCode.append(qrRef.current)

    }, [qrCode])

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
                                        qrCode.update({ dotsOptions: { ...qrCode._options.dotsOptions, type: e.target.value } })
                                    }
                                    defaultValue={qrCode._options.dotsOptions?.type}
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
                                            qrCode.update({ cornersDotOptions: { ...qrCode._options.cornersDotOptions, type: e.target.value } })
                                    }
                                        defaultValue={qrCode._options.cornersDotOptions?.type}
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
                                    defaultValue={qrCode._options.cornersDotOptions?.color}
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
                                        qrCode.update({ cornersSquareOptions: { ...qrCode._options.cornersSquareOptions, type: e.target.value } })
                                    }
                                    defaultValue={qrCode._options.cornersSquareOptions?.type}
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
                                    defaultValue={qrCode._options.cornersSquareOptions?.color}
                                    onChange={(e) =>
                                        qrCode.update({ cornersSquareOptions: { ...qrCode._options.cornersSquareOptions, color: e.target.value } })
                                    }
                                />
                            </label>
                        </div>
                        <label>
                            Background Color:
                            <input
                                type="color"
                                defaultValue={qrCode._options.backgroundOptions?.color}
                                onChange={(e) =>
                                    qrCode.update({ backgroundOptions: { ...qrCode._options.backgroundOptions, color: e.target.value } })
                                }
                            />
                        </label>
                        <label>
                            Error Correction Level:
                            <select
                                onChange={(e) =>
                                    qrCode.update({ qrOptions: { ...qrCode._options.qrOptions, errorCorrectionLevel: e.target.value } })
                                }
                                defaultValue={qrCode._options.qrOptions?.errorCorrectionLevel}
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
                                    if (file.size > 1 * 1024 * 1024) {
                                        alert("File size exceeds 2MB.");
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
                            <button className='uploadSettings'>Upload Setting</button>
                            <div  ref={qrRef}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
