import RpcsNode from "@/entities/rpcsNode";
import {RpcsNodeType} from "@/shared/config/types";

type RpcsNodesListType = {
    rpcsNodes: RpcsNodeType[]
}

export default function RpcsNodesList({rpcsNodes}: RpcsNodesListType) {


    return (
        <>
            {rpcsNodes.map((rpcsNode, index) => (
                <>
                    <RpcsNode
                        key={rpcsNode.noder.address}
                        noder={rpcsNode.noder}
                        rpcIp={rpcsNode.rpcIp}
                        uptime={rpcsNode.uptime}
                        apiIp={rpcsNode.apiIp}
                        evmIp={rpcsNode.evmIp}
                        tx_index={rpcsNode.tx_index}
                    />
                </>
            ))}
        </>
    );
}