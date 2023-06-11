import axios from "axios"
let CURRENT_INDEX: number = 0
const SERVER_LENGTH: number = 2
const serverList : string[] = [
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
]

export const assignRoundRobin = async()=>{
    const selectedServer = serverList[CURRENT_INDEX%SERVER_LENGTH]
    CURRENT_INDEX+=1
    const clusterResponse = await axios.get(selectedServer)
    return clusterResponse.data
}

