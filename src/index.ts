import express, {Request, Response, Application} from 'express'
import { assignRoundRobin } from './Round/round'
import { rateLimiter } from './TokenBucket/TokenBucket'


const loadBalancer:Application = express() //load balancer
const subServerOne:Application  = express() //sub server
const subServerTwo:Application = express() //sub server


loadBalancer.use(rateLimiter)
loadBalancer.get("/roundrobin",(req: Request,res: Response)=>{
    assignRoundRobin().then(result=>{
        res.json(result)
    })
})


subServerOne.get("/",(req,res)=>{
    return res.json({
        "name":'Subserver 1 response'
    })
})


subServerTwo.get("/",(req,res)=>{
    return res.json({
        "name":'Subserver two respose'
    })
})



//runners
loadBalancer.listen(3000,()=>{
    console.log("Load balancer started")
})

subServerOne.listen(3001, ()=>{
    console.log("Sub server started on 3001")
})

subServerTwo.listen(3002, ()=>{
    console.log("Sub server started on 3002")
})