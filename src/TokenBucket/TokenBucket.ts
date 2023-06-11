import { Request, Response, NextFunction,  } from "express"
let BUCKET_TOKENS: number  = 4
let TIMER_STATUS: number =0  //0 for idle, 1 for running
export const rateLimiter = (request: Request, response: Response,next: NextFunction)=>{    
    if(BUCKET_TOKENS == 0 && TIMER_STATUS==1){
        response.json({message:"You are rate limited"})

    }
    else{
        BUCKET_TOKENS-=1
        startTimer()
        next()
    }

}

const startTimer = ()=>{
    if(TIMER_STATUS === 0){
        TIMER_STATUS = 1
        setInterval(()=>{
            BUCKET_TOKENS = 4
            TIMER_STATUS = 0

        },7000)
    }

}