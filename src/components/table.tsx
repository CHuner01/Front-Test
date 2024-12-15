import {rpcsApi} from "@/config/api";
import RpcsNode from "@/entities/rpcsNode";
import {RpcsNodeType} from "@/config/types";

export default async function Table() {
    const response  = await fetch(rpcsApi);
    const nodes: RpcsNodeType[] = await response.json();

    //cosmos or evm

    return (
        <>
            {nodes.map((rpcsNode) => (
                <RpcsNode


                />
            ))}
        </>
    );
}