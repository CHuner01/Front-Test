import {MapNodeType} from "@/shared/config/types";
import DiagramDataCenter from "@/widgets/map-data/diagramDataCenter";
import ModalDataCenter from "@/widgets/map-data/modalDataCenter";

type DataCenterType = {
    mapNodes : MapNodeType[]
}

export default function DataCenter({mapNodes}: DataCenterType) {

    const map = new Map();
    mapNodes.forEach(user => {
        if (!map.has(user.as)) {
            map.set(user.as, []);
        }
        map.get(user.as).push(user);
    });

    const sortedMapNodes = Array.from(map.values());
    sortedMapNodes.sort((a, b) => b.length - a.length);

    return (
        <>
            <DiagramDataCenter mapNodes={sortedMapNodes.slice(0, 6)}/>
            <ModalDataCenter />

        </>
    );
}