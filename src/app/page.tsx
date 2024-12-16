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
    // const response  = await fetch(mapApi);
    // const data = await response.json();
    // const rpcsNodes = data;

    const [ data1, data2] = await Promise.all([fetchNetworkData(), fetchMapData()]);

    return (
        <>
            <div className="flex justify-center flex-col w-full p-4
                text-white
            ">
                <div className="my-3">
                    <p className="font-pingfang text-lg">Node Data Center</p>



                </div>
                <div className="my-3">
                    <DataCenter mapNodes={data2}/>
                </div>
                <div className="my-3">
                    <RpcsTable rpcsNodes={data1.rpcs}/>
                </div>
            </div>
        </>
    );
}
