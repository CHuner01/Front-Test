'use client'
import {CosmosNodeType, EvmNodeType, RpcsNodeType} from "@/config/types";
import {useEffect, useState} from "react";
import RpcsNodesList from "@/widgets/RpcsNodesList";

type RpcsFilterType = "cosmos" | "evm"
type BlockHistoryType = "random" | "ascending" | "descending"
type IndexationFilterType = "random" | "on" | "off"


type RpcsArrayType = {
    cosmos: CosmosNodeType[],
    evm: EvmNodeType[]
}

type RpcsTableType = {
    rpcsNodes: RpcsArrayType
}

export default function RpcsTable({rpcsNodes}: RpcsTableType) {

    const [rpcsFilter, setRpcsFilter] = useState<RpcsFilterType>("cosmos");
    const [indexationFilter , setIndexationFilter] = useState<IndexationFilterType>("random");
    const [blockHistoryFilter, setBlockHistoryFilter] = useState<BlockHistoryType>("random");
    const [searchMoniker, setSearchMoniker] = useState<string>("");

    const [sortedNodes, setSortedNodes] = useState<RpcsNodeType[]>(rpcsNodes.cosmos);

    useEffect(() => {
        CheckFilters();
    }, [rpcsFilter, indexationFilter, blockHistoryFilter, searchMoniker]);

    function CheckFilters() {
        console.log(rpcsFilter, indexationFilter, blockHistoryFilter, searchMoniker)

        let filteredNodes: RpcsNodeType[];

        if (rpcsFilter === "cosmos") {
            filteredNodes = rpcsNodes.cosmos;
        } else {
            filteredNodes = rpcsNodes.evm;
        }

        if (indexationFilter === "on") {
            filteredNodes = filteredNodes.filter((node) => node.tx_index !== "off");
        } else if (indexationFilter === "off") {
            filteredNodes = filteredNodes.filter((node) => node.tx_index !== "on");
        }


        if (blockHistoryFilter === "ascending") {
            filteredNodes = [...filteredNodes].sort((a, b) => a.uptime - b.uptime);
        } else if (blockHistoryFilter === "descending") {
            filteredNodes = [...filteredNodes].sort((a, b) => b.uptime - a.uptime);
        }


        if (searchMoniker.length > 0) {
            filteredNodes = filteredNodes.filter((node) =>
                node.noder.moniker.toLowerCase().includes(searchMoniker.toLowerCase())
            );
        }

        setSortedNodes(filteredNodes);

        console.log(rpcsNodes)
        console.log("cosmos")
        console.log(rpcsNodes.cosmos)
        console.log("evm")
        console.log(rpcsNodes.evm)
        console.log("sorted")
        console.log(sortedNodes);
    }

    return (
        <>
            <div><button onClick={() => setRpcsFilter("cosmos")}>Cosmos</button></div>
            <div><button onClick={() => setRpcsFilter("evm")}>Evm</button></div>
            <div><button onClick={() => setBlockHistoryFilter("ascending")}>По возрастанию</button></div>
            <div><button onClick={() => setBlockHistoryFilter("descending")}>По убыванию</button></div>
            <div><button onClick={() => setIndexationFilter("on")}>On</button></div>
            <div><button onClick={() => setIndexationFilter("off")}>Off</button></div>
            <div>
                <p>Ввод</p>
                <input onChange={(e) => setSearchMoniker(e.target.value)} />
            </div>

            {sortedNodes && <RpcsNodesList rpcsNodes={sortedNodes}/>}
        </>
    );
}