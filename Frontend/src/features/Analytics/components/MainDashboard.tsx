import '../styles/MainDashbaord.css';
import {fetchWithAuth, initialFetch} from "../hooks/fetchWithAuth.tsx";
import {useEffect, useState} from "react";
import {DateRangePicker} from "rsuite";
import {DevicePie} from "./DevicePie.tsx";
import {OsPie} from "./OsPie.tsx";
import {ClicksData} from "./ClicksData.tsx";
import {GeoData} from "./GeoData.tsx";
import {SideNav} from "../../SideNav/components/SideNav.tsx";
import { Link } from 'react-router';
const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/analytics/g` : "/analytics/g";

export function MainDashboard() {
    const [startDate, setStartDate] = useState<string>(new Date().toISOString());
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());
    const [allowed,setAllowed] = useState<boolean>(false);
    const [deviceData, setDeviceData] = useState([]);
    const [osData, setOsData] = useState([]);
    const [clickData, setClickData] = useState([]);
    const [geoData, setGeoData] = useState([]);
    const [linkCount, setLinkCount] = useState(0);
    const [qrClicks,setQrClicks] = useState(0);
    const [linkClicks,setLinkClicks] = useState(0);
    const { afterToday } = DateRangePicker;

    useEffect(() => {
        async function boot() {
            const authSuccess = await initialFetch();
            if (authSuccess) {
                const sevenDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
                setStartDate(sevenDaysAgo)
                setAllowed(true);
            }
        }
        boot().then();
    }, []);


    useEffect(() => {
        if(!allowed) return;

        async function getData(){
            const result = await fetchWithAuth(`${url}/?start=${startDate}&end=${endDate}`);
            const data = await result.json()
            console.log("Data", data)
            if(data.linkCount) setLinkCount(data.linkCount)
            if(data.qrStats.qrClicks) setQrClicks(data.qrStats.qrClicks)
            if(data.qrStats.linkClicks) setLinkClicks(data.qrStats.linkClicks)
            if(data.data.device) setDeviceData(data.data.device)
            if(data.data.os) setOsData(data.data.os)
            if(data.data.click) setClickData(data.data.click)
            if(data.data.location) setGeoData(data.data.location)
        }

        getData().then();

    }, [allowed, endDate, startDate]);

    return (
        <>
            <div id="tooltip"></div>
            <div className="dashboard">
                <SideNav/>
                <div className='analyticsMain'>
                    <h2>Welcome { localStorage.getItem('username') }</h2>
                    <div className="overAll-stats">
                        <Link to='/analytics' className='statsContainer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M684-80q-48.33 0-82.17-33.83Q568-147.67 568-196q0-7.33 4.33-32l-293-171.33q-16.18 16.56-37.42 25.94Q220.67-364 196-364q-48.33 0-82.17-33.83Q80-431.67 80-480t33.83-82.17Q147.67-596 196-596q24 0 45 9.03T278-562l294.33-170q-2-7.67-3.16-15.5Q568-755.33 568-764q0-48.33 33.83-82.17Q635.67-880 684-880t82.17 33.83Q800-812.33 800-764t-33.83 82.17Q732.33-648 684-648q-23.52 0-44.09-8.83-20.58-8.84-36.58-23.84L307-513.33q2.67 7.66 3.83 16.16 1.17 8.5 1.17 16.84 0 8.33-.83 15.5-.84 7.16-2.84 14.83L604-280q16-15 36.4-23.5 20.39-8.5 43.7-8.5 48.57 0 82.23 33.83Q800-244.33 800-196t-33.83 82.17Q732.33-80 684-80Zm.02-66.67q20.98 0 35.15-14.19 14.16-14.19 14.16-35.16 0-20.98-14.19-35.15-14.19-14.16-35.16-14.16-20.98 0-35.15 14.19-14.16 14.19-14.16 35.16 0 20.98 14.19 35.15 14.19 14.16 35.16 14.16Zm-488-284q20.98 0 35.15-14.19 14.16-14.19 14.16-35.16 0-20.98-14.19-35.15-14.19-14.16-35.16-14.16-20.98 0-35.15 14.19-14.16 14.19-14.16 35.16 0 20.98 14.19 35.15 14.19 14.16 35.16 14.16Zm488-284q20.98 0 35.15-14.19 14.16-14.19 14.16-35.16 0-20.98-14.19-35.15-14.19-14.16-35.16-14.16-20.98 0-35.15 14.19-14.16 14.19-14.16 35.16 0 20.98 14.19 35.15 14.19 14.16 35.16 14.16ZM684-196ZM196-480Zm488-284Z" /></svg>
                            <div className='statsHolder'>
                                <p className='statsTitle'>Active Links</p>
                                <p className='statsCount'>{linkCount}</p>
                            </div>
                        </Link>
                        <div className='statsContainer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M480.08-326.67q72.25 0 122.75-50.58 50.5-50.57 50.5-122.83 0-72.25-50.58-122.75-50.57-50.5-122.83-50.5-72.25 0-122.75 50.58-50.5 50.57-50.5 122.83 0 72.25 50.58 122.75 50.57 50.5 122.83 50.5Zm-.24-62.66q-46.17 0-78.34-32.33-32.17-32.32-32.17-78.5 0-46.17 32.33-78.34 32.32-32.17 78.5-32.17 46.17 0 78.34 32.33 32.17 32.32 32.17 78.5 0 46.17-32.33 78.34-32.32 32.17-78.5 32.17ZM480-200q-146 0-264.67-82.5Q96.67-365 40-500q56.67-135 175.33-217.5Q334-800 480-800t264.67 82.5Q863.33-635 920-500q-56.67 135-175.33 217.5Q626-200 480-200Zm0-300Zm-.11 233.33q118.44 0 217.61-63.5 99.17-63.5 151.17-169.83-52-106.33-151.06-169.83-99.05-63.5-217.5-63.5-118.44 0-217.61 63.5-99.17 63.5-151.83 169.83 52.66 106.33 151.72 169.83 99.05 63.5 217.5 63.5Z" /></svg>
                            <div className='statsHolder'>
                                <p className='statsTitle'>Total Impressions</p>
                                <p className='statsCount'>{qrClicks + linkClicks}</p>
                            </div>
                        </div>
                        <div>
                            <div className="statsContainer">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M446.67-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h166.67v66.67H280q-55.56 0-94.44 38.84-38.89 38.84-38.89 94.33 0 55.49 38.89 94.49 38.88 39 94.44 39h166.67V-280ZM323.33-446.67v-66.66h313.34v66.66H323.33Zm190 166.67v-66.67H680q55.56 0 94.44-38.84 38.89-38.84 38.89-94.33 0-55.49-38.89-94.49-38.88-39-94.44-39H513.33V-680H680q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H513.33Z" /></svg>
                                <div className="statsHolder">
                                    <p className='statsTitle'>Link Clicks</p>
                                    <p className='statsCount'>{linkClicks}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="statsContainer">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M120-513.33V-840h326.67v326.67H120ZM186.67-580H380v-193.33H186.67V-580ZM120-120v-326.67h326.67V-120H120Zm66.67-66.67H380V-380H186.67v193.33Zm326.66-326.66V-840H840v326.67H513.33ZM580-580h193.33v-193.33H580V-580Zm178.67 460v-81.33H840V-120h-81.33ZM513.33-364.67v-82h81.34v82h-81.34Zm81.34 81.34v-81.34h82v81.34h-82Zm-81.34 82v-82h81.34v82h-81.34ZM594.67-120v-81.33h82V-120h-82Zm82-81.33v-82h82v82h-82Zm0-163.34v-82h82v82h-82Zm82 81.34v-81.34H840v81.34h-81.33Z" /></svg>
                                <div className="statsHolder">
                                    <p className='statsTitle'>QR Clicks</p>
                                    <p className='statsCount'>{qrClicks}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DateRangePicker
                        className="calender"
                        value={[new Date(startDate),new Date(endDate)]}
                        size="lg"
                        shouldDisableDate={afterToday()}
                        onChange={(value) => {
                            if (value) {
                                const [start, end] = value;
                                setEndDate(end.toISOString())
                                setStartDate(start.toISOString());
                            }
                        }}
                        format="yyyy-MM-dd"
                        placeholder="Select date range"
                        showOneCalendar={true}
                    />
                    <div id='analyticsHolder'>
                        <DevicePie data={deviceData} />
                        <OsPie data={osData} />
                        <ClicksData data={clickData}/>
                        <GeoData data={geoData}/>
                    </div>
                </div>
            </div>
        </>
    );
}