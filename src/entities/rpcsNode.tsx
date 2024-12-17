'use client'
import {RpcsNodeType} from "@/shared/config/types";
import Image from 'next/image'
import CopyIcon from "../../public/images/CopyIcon.svg"
import UserIcon from "../../public/images/UserIcon.svg"
import CubeIcon from "../../public/images/CubeIcon.svg"
import OnIcon from "../../public/images/OnIcon.svg"
import OffIcon from "../../public/images/OffIcon.svg"
import {useState} from "react";
import CopyAlert from "@/entities/copyAlert";


export default function RpcsNode({noder, rpcIp, uptime, tx_index, evmIp}: RpcsNodeType) {

    const link: string = `http://${rpcIp ? rpcIp : evmIp}`
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpening, setIsOpening] = useState<boolean>(false);

    function handleCopy(link: string) {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                setIsOpen(true);
                setIsOpening(false);

                setTimeout(() => {
                    setIsOpening(true);
                }, 100);
                setTimeout(() => {
                    setIsOpening(false);
                }, 1500);
                setTimeout(() => {
                    setIsOpen(false);
                }, 2000);
            })
            .catch((err) => {
                console.error("Ошибка копирования");
            });
    }

    return (
        <>
            <div className="flex flex-row flex-wrap gap-y-5 justify-between items-center my-5 lg:my-1.5 p-2.5 min-h-[87px]
        font-poppins text-lg">
                <div className="flex flex-row justify-center gap-6 w-[100%] lg:w-[30%]">
                    <div>{rpcIp ? "RPC" : "EVM"}</div>
                    <div className="flex w-full max-w-[220px]">
                        <span className="truncate">{link}</span>
                    </div>
                    <button className="flex items-center">
                        <Image onClick={() => handleCopy(link)} src={CopyIcon} alt="Icon" width="12" height="18" />
                    </button>
                </div>

                <div className="text-[#89C4FF] flex flex-row justify-center gap-2 w-[50%] md:w-[30%]">
                    <div className="flex items-center">
                        <Image src={UserIcon} alt="Icon" width="18" height="18" />
                    </div>
                    <div className="flex w-full max-w-[150px] lg:max-w-[220px]">
                        <span className="truncate">{noder.moniker}</span>
                    </div>
                </div>
                <div className="text-[#89C4FF] flex flex-row justify-center gap-2 w-[30%] md:w-[20%]">
                    <div className="flex items-center">
                        <Image src={CubeIcon} alt="Icon" width="16" height="18" />
                    </div>
                    <div>{uptime}</div>
                </div>
                <div className="font-pingfang flex flex-row justify-center text-base gap-2 w-[20%] md:w-[20%]">
                    <div className="flex items-center">
                        {tx_index === "on" ? <Image src={OnIcon} alt="Icon" width="27" height="27" />
                            : <Image src={OffIcon} alt="Icon" width="27" height="27" />}
                    </div>
                    <div>{tx_index === "on" ? "On" : "Off"}</div>
                </div>
            </div>
            {isOpen && (
                <div
                    className={`transition-opacity duration-500
                    ${isOpening ? "opacity-100" : "opacity-0"}`}
                >
                    <CopyAlert />
                </div>
            )}
        </>
    );
}