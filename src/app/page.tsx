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
    const [data1, data2] = await Promise.all([fetchNetworkData(), fetchMapData()]);

    const countryNames: Map<string, string> = new Map();

    const ipCosmosData = data1.rpcs.cosmos
    for (let i = 0; i < ipCosmosData.length; i++) {
        const currentIp = ipCosmosData[i].rpcIp.split(':')[0];
        for (let j = 0; j < data2.length; j++) {
            if (currentIp === data2[j].ip) {
                countryNames.set(currentIp, data2[j].country);
                break
            }
        }
    }
    const ipEvmData = data1.rpcs.evm
    for (let i = 0; i < ipEvmData.length; i++) {
        const currentIp = ipEvmData[i].evmIp.split(':')[0];
        for (let j = 0; j < data2.length; j++) {
            if (currentIp === data2[j].ip) {
                countryNames.set(currentIp, data2[j].country);
                break
            }
        }
    }

    return (
        <>
            <div className="flex min-w-0 justify-center flex-col gap-10 w-full p-4 sm:p-8 text-white">
                <p className="font-pingfang text-xl">Node Data Center</p>
                <DataCenter mapNodes={data2}/>
                <RpcsTable rpcsNodes={data1.rpcs} countryNames={countryNames}/>
            </div>
        </>
    );
}
