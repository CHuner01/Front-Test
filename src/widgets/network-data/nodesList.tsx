import RpcsNode from "@/entities/rpcsNode";
import {RpcsNodeType} from "@/shared/config/types";

type RpcsNodesListType = {
    rpcsNodes: RpcsNodeType[]
}

export default function NodesList({rpcsNodes}: RpcsNodesListType) {


    return (
        <>
            {rpcsNodes.length > 0 ? (
                rpcsNodes.map((rpcsNode, index) => (
                    <RpcsNode
                        key={rpcsNode.noder.address}
                        noder={rpcsNode.noder}
                        rpcIp={rpcsNode.rpcIp}
                        uptime={rpcsNode.uptime}
                        apiIp={rpcsNode.apiIp}
                        evmIp={rpcsNode.evmIp}
                        tx_index={rpcsNode.tx_index}
                    />
                ))
            ) : (
                <div className="flex items-center justify-center h-[200px] text-[#707070]">
                    <p className="font-poppins font-xl">Nothing found</p>
                </div>
            )}
        </>
    );
}