import {rpcsApi} from "@/config/api";


import RpcsTable from "@/widgets/table";


export default async function Home() {
    const response  = await fetch(rpcsApi);
    const data = await response.json();
    const rpcsNodes = data.rpcs;

    return (
        <>
            <RpcsTable rpcsNodes={rpcsNodes}/>
        </>
    );
}
