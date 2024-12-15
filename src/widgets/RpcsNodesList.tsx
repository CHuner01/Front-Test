import RpcsNode from "@/entities/rpcsNode";
import {RpcsNodeType} from "@/config/types";

type RpcsNodesListType = {
    rpcsNodes: RpcsNodeType[]
}

export default function RpcsNodesList({rpcsNodes}: RpcsNodesListType) {


    return (
        <>
            {rpcsNodes.map((rpcsNode, index) => (
                <>
                    <p>{index}</p>
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