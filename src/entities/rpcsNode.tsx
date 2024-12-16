import {RpcsNodeType} from "@/shared/config/types";
import Image from 'next/image'
import CopyIcon from "../../public/images/CopyIcon.svg"
import UserIcon from "../../public/images/UserIcon.svg"
import CubeIcon from "../../public/images/CubeIcon.svg"
import OnIcon from "../../public/images/OnIcon.svg"
import OffIcon from "../../public/images/OffIcon.svg"

export default function RpcsNode({noder, rpcIp, uptime, tx_index, evmIp}: RpcsNodeType) {


    return (
        <div className="flex flex-row justify-around items-center my-2.5 h-[87px] font-poppins text-lg">
            <div className="flex flex-row">
                <div>{rpcIp ? "RPC" : "EVM"}</div>
                <div>http://{rpcIp ? rpcIp : evmIp}</div>
                <div className="flex items-center">
                    <Image src={CopyIcon} alt="Icon" width="12.35" height="15" />
                </div>
            </div>

            <div className="text-[#89C4FF] flex flex-row">
                <div className="flex items-center">
                    <Image src={UserIcon} alt="Icon" width="18" height="18" />
                </div>
                <div>{noder.moniker}</div>
            </div>
            <div className="text-[#89C4FF] flex flex-row">
                <div className="flex items-center">
                    <Image src={CubeIcon} alt="Icon" width="16" height="18" />
                </div>
                <div>{uptime}</div>
            </div>
            <div className="font-pingfang flex flex-row text-base">
                <div className="flex items-center">
                    {tx_index === "on" ? <Image src={OnIcon} alt="Icon" width="27" height="27" />
                        : <Image src={OffIcon} alt="Icon" width="27" height="27" />}
                </div>
                <div>{tx_index}</div>
            </div>
        </div>
    );
}