'use client'
import {PercentNodeType} from "@/shared/config/types";
import {useEffect, useState} from "react";
import Image from "next/image";
import CloseIcon from "../../../public/images/CloseIcon.svg"
import GroupIcon from "../../../public/images/GroupIcon.svg"
import UserIcon from "../../../public/images/UserIcon.svg"
import PaginationControl from "@/widgets/map-data/paginationControl";

type ModalDataCenterType = {
    mapNodes: PercentNodeType[],
    isOpen: boolean,
    onClose: () => void;
}

export default function ModalDataCenter({mapNodes, onClose, isOpen}: ModalDataCenterType) {
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Блокирует прокрутку
        } else {
            document.body.style.overflow = 'auto'; // Восстанавливает прокрутку
        }
        return () => {
            document.body.style.overflow = 'auto'; // Очистка при размонтировании компонента
        };
    }, [isOpen]);

    if (!isOpen) return null;

    function handlePageChange(page: number) {
        setPage(page);
    }

     const totalPages = Math.ceil(mapNodes.length / 5)


    return (
        <div className="fixed inset-0 p-4 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="min-w-[400px] max-w-[1058px] p-[30px] w-full flex flex-col gap-[30px] rounded-2xl bg-[#0F0F0F]">
                <div className="flex flex-row  justify-between text-2xl">
                    <div className="flex flex-row gap-2 items-center">
                        <div>Node Data center</div>
                        <div>
                            <Image src={GroupIcon} alt="Icon" width="55" height="20" />
                        </div>
                        <div>{mapNodes.length}</div>
                    </div>
                    <div>
                        <button onClick={onClose}>
                            <Image src={CloseIcon} alt="Icon" width="34" height="34" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-y-5">
                    {mapNodes.slice((page - 1) * 5, page * 5).map((mapNode, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/3">
                            <div className="flex flex-row items-center">
                                <div className="text-[#7C8798] mx-3">{mapNode.id}</div>
                                <Image src={UserIcon} alt="Icon" width="18" height="18" />
                                <div className="flex w-full  max-w-[150px] mx-2">
                                    <span className="truncate">{mapNode.name}</span>
                                </div>
                                <div className="h-[23px] w-full max-w-[66px] mx-3 rounded-full bg-[#799DB233] text-[#7C8798]
                            flex justify-center text-sm"
                                >{mapNode.percent}%</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center lg:justify-end flex-row gap-2 m-1">
                    <PaginationControl currentPage={page} totalPages={totalPages} changePage={handlePageChange}/>
                </div>
            </div>
        </div>
    );
}