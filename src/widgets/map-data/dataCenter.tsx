import {MapNodeType, PercentNodeType} from "@/shared/config/types";
import DiagramDataCenter from "@/widgets/map-data/diagramDataCenter";
import PlusIcon from "../../../public/images/PlusIcon.svg";
import MinusIcon from "../../../public/images/MinusIcon.svg";
import MapImage from "../../../public/images/MapImage.svg";
import Image from "next/image";


type DataCenterType = {
    mapNodes : MapNodeType[]
}

type SortedMapNodesType = MapNodeType[][]

export default function DataCenter({mapNodes}: DataCenterType) {

    const map = new Map();
    mapNodes.forEach(user => {
        if (!map.has(user.as)) {
            map.set(user.as, []);
        }
        map.get(user.as).push(user);
    });

    const sortedMapNodes: SortedMapNodesType = Array.from(map.values());
    sortedMapNodes.sort((a, b) => b.length - a.length);

    const totalNodes = mapNodes.length;

    const percentNodes: PercentNodeType[] = sortedMapNodes.map((group, index) => {
        const id = index + 1;
        const name = group.map(node => node.isp).join(", ");
        const percent = Math.round((group.length / totalNodes) * 100 * 100) / 100;
        return { id, name, percent };
    });

    return (
        <div className="flex flex-col-reverse xl:flex-row justify-between ">
            <div>
                <DiagramDataCenter mapNodes={percentNodes}/>
            </div>
            <div className="relative w-full p-2 flex justify-center">
                <div className=" w-[680px] flex-none overflow-hidden">
                    <Image src={MapImage} alt="Icon" width="680" height="400" />

                </div>
                <div className="flex flex-col gap-y-5 m-3 absolute bottom-0 right-0">
                    <button className="w-[34px] h-[34px] sm:w-[48px] sm:h-[48px] bg-[#484848] flex items-center justify-center rounded-lg">
                        <Image src={PlusIcon} alt="Icon" width="18" height="18" />
                    </button>
                    <button className="w-[34px] h-[34px] sm:w-[48px] sm:h-[48px] bg-[#484848] flex items-center justify-center rounded-lg">
                        <Image src={MinusIcon} alt="Icon" width="18" height="2" />
                    </button>
                </div>
            </div>
        </div>
    );
}