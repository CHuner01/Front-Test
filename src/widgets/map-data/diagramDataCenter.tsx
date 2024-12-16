import {PercentNodeType} from "@/shared/config/types";
import Image from "next/image";
import GroupIcon from "../../../public/images/GroupIcon.svg";
import SmoothDonutChart from "@/widgets/map-data/donutChart";


type DiagramDataCenterType = {
    mapNodes: PercentNodeType[]
}

export default function DiagramDataCenter({mapNodes}: DiagramDataCenterType) {

    const names = mapNodes.map(node => node.name);
    const percents = mapNodes.map(node => node.percent);

    const numberPercent = percents.reduce((accumulator, currentValue) =>
        accumulator + currentValue, 0);

    const remainingPercent = 100 - numberPercent;
    names.push("remaining");
    percents.push(remainingPercent);

    return (
        <div className="w-[387px] flex flex-col gap-[20px] p-[30px] rounded-2xl font-poppins bg-green-600">
            <div className="flex flex-row items-center justify-between">
                <p className="text-lg">Node Data center</p>
                <div className="flex flex-row">
                    <Image src={GroupIcon} alt="Icon" width="55" height="20" />
                    <p className="text-2xl">{mapNodes.length}</p>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="w-[138px] h-[138px]">
                    <SmoothDonutChart names={names} values={percents}/>
                </div>
                <div>
                    {mapNodes.map((mapNode, index) => (
                        <div key={index} className="flex max-w-[174px] items-center space-x-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <span className="truncate">{mapNode.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <button className="text-sm px-10 py-1 rounded-full text-[#9AB1CF] bg-amber-200"
                >View all centers</button>

            </div>
        </div>
    );
}