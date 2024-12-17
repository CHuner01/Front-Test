'use client'
import {PercentNodeType} from "@/shared/config/types";
import Image from "next/image";
import GroupIcon from "../../../public/images/GroupIcon.svg";
import SmoothDonutChart from "@/entities/donutChart";
import ModalDataCenter from "@/widgets/map-data/modalDataCenter";
import {useState} from "react";
import {diagramColors} from "@/shared/config/colors";


type DiagramDataCenterType = {
    mapNodes: PercentNodeType[]
}

export default function DiagramDataCenter({mapNodes}: DiagramDataCenterType) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const topNodes = mapNodes.slice(0, 6);
    const names = topNodes.map(node => node.name);
    const percents = topNodes.map(node => node.percent);

    const numberPercent = percents.reduce((accumulator, currentValue) =>
        accumulator + currentValue, 0);

    const remainingPercent = 100 - numberPercent;
    names.push("remaining");
    percents.push(remainingPercent);

    return (
        <>
            <div className="min-w-0 w-full max-w-[387px] flex flex-col gap-[20px] p-[30px] m-2
            rounded-2xl font-poppins bg-primary">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-lg">Node Data center</p>
                    <div className="flex flex-row ">
                        <Image src={GroupIcon} alt="Icon" width="55" height="20" />
                        <p className="text-2xl ml-2">{mapNodes.length}</p>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="max-w-[138px] h-[138px]">
                        <SmoothDonutChart names={names} values={percents}/>
                    </div>
                    <div className="pl-2 flex flex-col gap-1">
                        {topNodes.map((mapNode, index) => (
                            <div key={index} className="flex max-w-[174px] items-center space-x-1">
                                <div>
                                    <div style={{ backgroundColor: diagramColors[index] }}
                                         className={"w-2.5 h-2.5 m-1 rounded-full"}></div>
                                </div>
                                <span className="truncate text-[#7C8798] text-sm">{mapNode.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="text-sm px-10 py-1 rounded-full text-[#9AB1CF] bg-[#9AB1CF26]"
                            onClick={openModal}
                    >View all centers</button>
                </div>
            </div>
            <ModalDataCenter mapNodes={mapNodes} onClose={closeModal} isOpen={isModalOpen}/>
        </>
    );
}