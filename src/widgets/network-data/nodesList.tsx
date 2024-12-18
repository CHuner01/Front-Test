import RpcNode from "@/entities/rpcNode";
import {RpcsNodeType} from "@/shared/config/types";

type RpcsNodesListType = {
    rpcsNodes: RpcsNodeType[],
    countryNames: Map<string, string>
}

export default function NodesList({rpcsNodes, countryNames}: RpcsNodesListType) {

    return (
        <>
            {rpcsNodes.length > 0 ? (
                rpcsNodes.map((rpcsNode, index) => (
                    <div key={index} className={index % 2 !== 1 ? "bg-[#0B0B0B]" : ""}>
                        <RpcNode
                            noder={rpcsNode.noder}
                            rpcIp={rpcsNode.rpcIp}
                            uptime={rpcsNode.uptime}
                            apiIp={rpcsNode.apiIp}
                            evmIp={rpcsNode.evmIp}
                            tx_index={rpcsNode.tx_index}
                            countryNames={countryNames}
                        />
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center h-[200px] text-[#707070]">
                    <p className="font-poppins font-xl">Nothing found</p>
                </div>
            )}
        </>
    );
}