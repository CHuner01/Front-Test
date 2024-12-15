import {mapApi, rpcsApi} from "@/shared/config/api";
import RpcsTable from "@/widgets/network-data/table";
import DataCenter from "@/widgets/map-data/dataCenter";

async function fetchNetworkData() {
    try {
        const response = await fetch(rpcsApi);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchMapData() {
    try {
        const response = await fetch(mapApi);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}


export default async function Home() {
    // const response  = await fetch(rpcsApi);
    // const data = await response.json();
    // const rpcsNodes = data.rpcs;

    const [data1 , data2] = await Promise.all([fetchNetworkData(), fetchMapData()]);

    return (
        <>
            <RpcsTable rpcsNodes={data1.rpcs}/>
            <DataCenter mapNodes={data2.data}/>
        </>
    );
}
