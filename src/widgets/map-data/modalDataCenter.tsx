'use client'
import {PercentNodeType} from "@/shared/config/types";
import {useState} from "react";
import Image from "next/image";
import CloseIcon from "../../../public/images/CloseIcon.svg"
import GroupIcon from "../../../public/images/GroupIcon.svg"

type ModalDataCenterType = {
    mapNodes: PercentNodeType[]
}

export default function ModalDataCenter({mapNodes}: ModalDataCenterType) {

    const [page, setPage] = useState<number>(1);

    // const totalPages = Math.ceil(mapNodes.length / 5)


    return (
        <div className="w-[1058px] p-[30px] flex flex-col gap-[30px] bg-amber-500">
            <div className="flex flex-row text-2xl">
                <div className="flex flex-row items-center">
                    <div>Node Data center</div>
                    <div>
                        <Image src={GroupIcon} alt="Icon" width="55" height="20" />
                    </div>
                    <div>{mapNodes.length}</div>
                </div>
                <div className="flex items-center">
                    <button>
                        <Image src={CloseIcon} alt="Icon" width="34" height="34" />
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap">
                {mapNodes.slice((page - 1) * 5, page * 5).map((mapNode, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3">
                        <div className="flex flex-row">
                            <div className="text-[#7C8798]">{mapNode.id}</div>
                            <div>icon</div>
                            <div className="flex max-w-[200px]">
                                <span className="truncate">{mapNode.name}</span>
                            </div>
                            <div className="h-[23px] w-[66px] rounded-full bg-[#799DB233] text-[#7C8798]
                            flex justify-center"
                            >{mapNode.percent}%</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end flex-row gap-2 m-1">
                <button onClick={() => setPage(prevState => prevState - 1)}>Влево</button>
                <button onClick={() => setPage(prevState => prevState + 1)}>Вправо</button>
            </div>
        </div>
    );
}