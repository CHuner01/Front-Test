import {MapNodeType, PercentNodeType} from "@/shared/config/types";
import DiagramDataCenter from "@/widgets/map-data/diagramDataCenter";
import ModalDataCenter from "@/widgets/map-data/modalDataCenter";
import PlusIcon from "../../../public/images/PlusIcon.svg";
import MinusIcon from "../../../public/images/MinusIcon.svg";
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
        <div className="flex flex-row">
            <div>
                <DiagramDataCenter mapNodes={percentNodes.slice(0, 6)}/>
            </div>
            <div className="w-[711px] h-[434px] bg-amber-800">
                Map
            </div>
            <div className="flex flex-col items-center">
                <button className="w-[48px] h-[48px] bg-[#484848] flex items-center justify-center rounded-lg">
                    <Image src={PlusIcon} alt="Icon" width="18" height="18" />
                </button>
                <button className="w-[48px] h-[48px] bg-[#484848] flex items-center justify-center rounded-lg">
                    <Image src={MinusIcon} alt="Icon" width="18" height="2" />
                </button>
            </div>

            {/*<ModalDataCenter  mapNodes={percentNodes}/>*/}
        </div>
    );
}