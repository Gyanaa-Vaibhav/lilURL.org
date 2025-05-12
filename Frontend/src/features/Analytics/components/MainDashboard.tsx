import '../styles/MainDashbaord.css';
import {fetchWithAuth, initialFetch} from "../hooks/fetchWithAuth.tsx";
import {useEffect, useState} from "react";
import {DateRangePicker} from "rsuite";
import {DevicePie} from "./DevicePie.tsx";
import {OsPie} from "./OsPie.tsx";
import {ClicksData} from "./ClicksData.tsx";
import {GeoData} from "./GeoData.tsx";
import {SideNav} from "../../SideNav/components/SideNav.tsx";
const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/analytics/g` : "/analytics/g";

export function MainDashboard() {
    const [startDate, setStartDate] = useState<string>(new Date().toISOString());
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());
    const [allowed,setAllowed] = useState<boolean>(false);
    const [deviceData, setDeviceData] = useState([]);
    const [osData, setOsData] = useState([]);
    const [clickData, setClickData] = useState([]);
    const [geoData, setGeoData] = useState([]);
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
            console.log("Data",data)
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
                    <div className="overAll-stats">
                        <div>
                            <h3>Total Impressions</h3>
                            <h4>{qrClicks + linkClicks}</h4>
                        </div>
                        <div>
                            <h3>Link Clicks</h3>
                            <h4>{linkClicks}</h4>
                        </div>
                        <div>
                            <h3>QR Clicks</h3>
                            <h4>{qrClicks}</h4>
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