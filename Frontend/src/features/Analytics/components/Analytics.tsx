import '../styles/Analytics.css';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';
import {DevicePie} from "./DevicePie.tsx";
import  {useEffect, useState} from "react";
import {OsPie} from "./OsPie.tsx";
import {ClicksData} from "./ClicksData.tsx";
import {GeoData} from "./GeoData.tsx";
import {fetchWithAuth, initialFetch} from "../hooks/fetchWithAuth.tsx";

const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/analytics` : "/analytics";
// TODO fetch data like this fetch(`/analytics/${linkID}/geo?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`) and date should be in .toISOString()

const Analytics = () => {
    const [startDate, setStartDate] = useState<string>(new Date().toISOString());
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());
    const [allowed,setAllowed] = useState<boolean>(false);

    const [deviceData, setDeviceData] = useState([]);
    const [osData, setOsData] = useState([]);
    const [clickData, setClickData] = useState([]);
    const [geoData, setGeoData] = useState([]);
    const { afterToday } = DateRangePicker;

    useEffect(() => {
        async function boot() {
            const authSuccess = await initialFetch();
            if (authSuccess) {
                setAllowed(true);
            }
        }

        boot().then();
    }, []);

    // TODO NEED TO CHANGE THE Static 1 to link
    useEffect(() => {
        if(!allowed) return;

        async function getDeviceData(){
            const deviceResult = await fetchWithAuth(`${url}/1/devices?start=${startDate}&end=${endDate}`)
            const data = await deviceResult.json();
            setDeviceData(data.data);
        }

        async function getOSData(){
            const deviceResult = await fetchWithAuth(`${url}/1/os?start=${startDate}&end=${endDate}`)
            const data = await deviceResult.json();
            setOsData(data.data);
        }

        async function getClickData(){
            const deviceResult = await fetchWithAuth(`${url}/1/clicks?start=${startDate}&end=${endDate}`)
            const data = await deviceResult.json();
            setClickData(data.data);
        }

        async function getGeoData(){
            const deviceResult = await fetchWithAuth(`${url}/1/geo?start=${startDate}&end=${endDate}`)
            const data = await deviceResult.json();
            setGeoData(data.data);
        }

        getDeviceData().then();
        getGeoData().then();
        getClickData().then();
        getOSData().then();

    },[startDate, endDate, allowed])

    return (
        <>
            <div id="tooltip"></div>
            <DateRangePicker
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

            <DevicePie data={deviceData} />
            <OsPie data={osData} />
            <ClicksData data={clickData}/>
            <GeoData data={geoData}/>
        </>
    );
}

export default Analytics;
