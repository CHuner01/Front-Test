'use client'
import {CosmosNodeType, EvmNodeType, RpcsNodeType} from "@/shared/config/types";
import {ChangeEvent, useEffect, useState} from "react";
import RpcsNodesList from "@/widgets/network-data/RpcsNodesList";
import CloseIcon from "../../../public/images/CloseIcon.svg";
import Image from "next/image";



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

    function handleChangeBlockHistory(event: ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value as BlockHistoryType;
        setBlockHistoryFilter(value);
    }

    function handleChangeIndexationFilter(event: ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value as IndexationFilterType;
        setIndexationFilter(value);
    }

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
    }

    return (
        <>
            <div className="flex justify-between font-pingfang m-1">
                <div className="text-lg flex items-center">
                    RPC / REST / GRPs
                </div>
                <div className="w-[380px]">
                    {/*<input onChange={(e) => setSearchMoniker(e.target.value)} />*/}
                    <form className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                onChange={(e) => setSearchMoniker(e.target.value)}
                                type="search"
                                className=" block w-full p-3 pr-5 font-pingfang text-base text-[#707070] bg-black border border-[#707070] rounded-full text-center focus:outline-none focus:border-[#707070] focus:ring-[#707070]"
                                placeholder="Search mode"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-[#707070]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="m-1 font-pingfang text-base">
                <button className={`px-10 py-2 mx-2.5 my-[5px] rounded-full
                        ${rpcsFilter === "cosmos" ? "text-black bg-white" : "text-white bg-primary"}`}
                        onClick={() => setRpcsFilter("cosmos")}
                >Cosmos</button>
                <button className={`px-10 py-2 mx-2.5 my-[5px] rounded-full
                        ${rpcsFilter === "evm" ? "text-black bg-white" : "text-white bg-primary"}`}
                        onClick={() => setRpcsFilter("evm")}
                >EVM</button>
            </div>
            <div className="m-1">
                <div className="flex flex-row items-center justify-around text-[#707070] text-base">
                    <div>Status, Location</div>
                    <div>Node</div>
                    <div className="flex flex-row">
                        <form className="max-w-sm mx-auto">
                            <select
                                value={blockHistoryFilter}
                                onChange={(e) => handleChangeBlockHistory(e)}
                                className="block py-2.5 px-0 w-full bg-transparent border-0 appearance-none dark:text-gray-400 dark:bg-gray-700 dark:border-none focus:outline-none focus:ring-0 peer"
                            >
                                <option value="random" hidden>Block history</option>
                                <option value="ascending"
                                        className="bg-gray-800 text-white dark:bg-gray-600 text-center"
                                >Ascending</option>
                                <option value="descending"
                                        className="bg-gray-800 text-white dark:bg-gray-600 text-center"
                                >Descending</option>
                            </select>
                        </form>
                        <button onClick={() => setBlockHistoryFilter("random")}>
                            <Image src={CloseIcon} alt="Icon" width="25" height="25" />
                        </button>
                    </div>
                    <div className="flex flex-row">
                        <form className="max-w-sm mx-auto">
                            <select
                                value={indexationFilter}
                                onChange={(e) => handleChangeIndexationFilter(e)}
                                className="block py-2.5 px-0 w-full bg-transparent border-0 appearance-none dark:text-gray-400 dark:bg-gray-700 dark:border-none focus:outline-none focus:ring-0 peer"
                            >
                                <option value="random" hidden>Indexation</option>
                                <option value="on"
                                        className="bg-gray-800 text-white dark:bg-gray-600 text-center"
                                >On</option>
                                <option value="off"
                                        className="bg-gray-800 text-white dark:bg-gray-600 text-center"
                                >Off</option>
                            </select>
                        </form>
                        <button onClick={() => setIndexationFilter("random")}>
                            <Image src={CloseIcon} alt="Icon" width="25" height="25" />
                        </button>
                    </div>
                </div>
                {sortedNodes && <RpcsNodesList rpcsNodes={sortedNodes}/>}
            </div>
        </>
    );
}