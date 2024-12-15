'use client'
import {MapNodeType} from "@/shared/config/types";
import {useState} from "react";

type ModalDataCenterType = {
    mapNodes: MapNodeType[]
}

export default function ModalDataCenter({mapNodes}: ModalDataCenterType) {

    const [page, setPage] = useState<number>(1);

    const totalCount = Math.ceil(mapNodes.length / 5)

    return (
        <>
            {mapNodes.slice((page - 1) * 5, page * 5).map((mapNode) => (
                <>
                    <p>{mapNode.isp}</p>
                </>
            ))}
        </>
    );
}