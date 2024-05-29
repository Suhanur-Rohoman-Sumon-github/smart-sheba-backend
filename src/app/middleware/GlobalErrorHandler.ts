import { NextFunction, Request, Response } from "express"

const handleGlobalError =((err:any,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = 500
    const massage = err.message || "something is brocken"
    console.log(err.message);
    return res.status(statusCode).json({
      success:false,
      massage,
      error:err
    })
  })

  export default handleGlobalError