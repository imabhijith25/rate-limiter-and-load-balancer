import { Request, Response, NextFunction,  } from "express"
let BUCKET_TOKENS: number  = 4
interface Timer{
    [key:string]: any,
}
let timer_library : Timer ={}
export const rateLimiter = (request: Request, response: Response,next: NextFunction)=>{    
    const {userId} = request.body
    if( ! timer_library.hasOwnProperty(userId)){
        timer_library[userId] = {
            token_remaining: BUCKET_TOKENS,
            joiningTime: new Date().getTime()
        }
        console.log(timer_library)
        next()
    }
    else{
        if(timer_library[userId].token_remaining === 0){
            return response.json({"message":"You are rate limited"})
        }
        else{
            console.log(timer_library)
            timer_library[userId].token_remaining -=1
            next()
        }
    }
}

const ReplenishTokens = ()=>{
    let replenishGap = 5000 //milliseconds
    let KeyObject: string[] = Object.keys(timer_library)
    let CurrentTime = new Date().getTime()
    for(let i=0; i< KeyObject.length; i++)
    {
        if(CurrentTime - timer_library[KeyObject[i]].joiningTime > replenishGap ){
            timer_library[KeyObject[i]].token_remaining = BUCKET_TOKENS
        }
    }

}
setInterval(()=>{
    ReplenishTokens()
},5000)