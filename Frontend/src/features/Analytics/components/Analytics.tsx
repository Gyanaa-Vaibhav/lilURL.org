import '../styles/Analytics.css';
import 'rsuite/dist/rsuite.min.css';
import { DateRangePicker } from 'rsuite';
import {DevicePie} from "./DevicePie.tsx";
import  {useEffect, useState} from "react";
import {OsPie} from "./OsPie.tsx";
import {ClicksData} from "./ClicksData.tsx";

const url = import.meta.env.VITE_SERVER ? `${import.meta.env.VITE_SERVER}/analytics` : "/analytics";
// TODO fetch data like this fetch(`/analytics/${linkID}/geo?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)&granularity=${granularity}}`) and date should be in .toISOString() granularity for day and hourly data 'hourly' : 'daily'
// TODO Fetch date for above or have something custom
// fetch(`${url}/1/clicks?start=2025-05-09T12:00:00.000Z&end=2025-05-09T23:59:59.999Z&granularity=hourly`).then(res => res.json()).then(data => console.log(data))


const Analytics = () => {
    const [deviceData, setDeviceData] = useState([]);
    const [osData, setOsData] = useState([]);
    const [clickData, setClickData] = useState([]);
    const [startDate, setStartDate] = useState<string>(new Date().toISOString());
    const [endDate, setEndDate] = useState<string>(new Date().toISOString());
    const { afterToday } = DateRangePicker;

    // TODO NEED TO CHANGE THE Static 1 to link
    useEffect(() => {
        async function getDeviceData(){
            const deviceResult = await fetch(`${url}/1/devices?start=${startDate}&end=${endDate}`)
            const data = await deviceResult.json();
            setDeviceData(data.data);
        }

        async function getOSData(){
            const deviceResult = await fetch(`${url}/1/os?start=${startDate}&end=${endDate}`)
            const data = await deviceResult.json();
            setOsData(data.data);
        }

        async function getClickData(){
            const deviceResult = await fetch(`${url}/1/clicks?start=${startDate}&end=${endDate}`)
            const data = await deviceResult.json();
            setClickData(data.data);
        }

        getClickData().then();
        getDeviceData().then();
        getOSData().then();


    },[startDate,endDate])

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
        </>
    );
}

export default Analytics;
