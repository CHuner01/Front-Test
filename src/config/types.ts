
type NoderType = {
    "moniker": string,
    "address": string,
}

export type RpcsNodeType = {
    "noder": NoderType,
    "rpcIp": string,
    "uptime": number,
    "apiIp": string,
    "tx_index": "on" | "off"
}