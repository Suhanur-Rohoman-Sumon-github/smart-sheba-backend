import { NextFunction, Request, Response } from "express"

const notFoundRoute =((req:Request,res:Response,next:NextFunction)=>{
    const statusCode = 400
    const massage =  "route not found"
    return res.status(statusCode).json({
      success:false,
      massage,
      error:""
    })
  })

  export default notFoundRoute