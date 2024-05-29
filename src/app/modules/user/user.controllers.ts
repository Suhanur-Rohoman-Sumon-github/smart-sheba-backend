import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendRespons"
import httpStatus from "http-status"
import { userSevres } from "./user.services"


  const getIsAdmFromDb =catchAsync(async (req, res) => {
    const email = req.query.email as string
   
    const results = await userSevres.getIsAdminDB(email)
    const isAdmin = results.isAdmin || false;
        res.status(httpStatus.OK).json({
          isAdmin
        })   
  })

  export const userControllers = {
    getIsAdmFromDb
  }