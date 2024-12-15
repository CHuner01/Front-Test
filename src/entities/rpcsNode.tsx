import {RpcsNodeType} from "@/shared/config/types";


export default function RpcsNode({noder, rpcIp, uptime, apiIp, tx_index, evmIp}: RpcsNodeType) {


    return (
        <>
            <p>--------------------------------------------------------</p>
            <p>Moniker</p>
            <p>{noder.moniker}</p>
            <p>address</p>
            <p>{noder.address}</p>
            <p>rpcIp</p>
            <p>{rpcIp}</p>
            <p>uptime</p>
            <p>{uptime}</p>
            <p>apiIp</p>
            <p>{apiIp}</p>
            <p>tx_index</p>
            <p>{tx_index}</p>
            <p>evmIp</p>
            <p>{evmIp}</p>
        </>
    );
}