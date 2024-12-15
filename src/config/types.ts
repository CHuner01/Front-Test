

type NoderType = {
    moniker: string,
    address: string,
}

export type CosmosNodeType = {
    noder: NoderType,
    rpcIp: string,
    uptime: number,
    apiIp?: string,
    tx_index: "on" | "off"
}

export type EvmNodeType = {
    noder: NoderType,
    uptime: number,
    evmIp: string,
    tx_index: "on" | "off"
}

export type RpcsNodeType = {
    noder: NoderType,
    rpcIp?: string,
    uptime: number,
    apiIp?: string,
    evmIp?: string,
    tx_index: "on" | "off"
}

