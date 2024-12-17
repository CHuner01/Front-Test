import {mapApi, rpcsApi} from "@/shared/config/api";
import RpcsTable from "@/widgets/network-data/nodesTable";
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
    const [ data1, data2] = await Promise.all([fetchNetworkData(), fetchMapData()]);

    return (
        <>
            <div className="flex min-w-0 justify-center flex-col gap-10 w-full p-4 sm:p-8 text-white">
                <p className="font-pingfang text-xl">Node Data Center</p>
                <DataCenter mapNodes={data2}/>
                <RpcsTable rpcsNodes={data1.rpcs}/>
            </div>
        </>
    );
}
