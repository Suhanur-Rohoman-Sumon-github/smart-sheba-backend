import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendRespons"
import httpStatus from "http-status"
import multer from 'multer';
import { signSevres } from "./signCoppy.services"
import { SinCopyModel, pdfModel } from "./signCoppy.model";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import config from "../../config";
import axios from "axios";
// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const creteSign = catchAsync(async (req,res) => {
    const sign = req.body.singDatas
    
    const results = await signSevres.createSingCopyInDb(sign)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"new sign created  successfully",
        data:results
      })
  })
const cretePayments = catchAsync(async (req,res) => {
    const paymentDetails = req.body
    
    const results = await signSevres.cretePaymentInDb(paymentDetails)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"new payments created  successfully",
        data:results
      })
  })
const getPayments = catchAsync(async (req,res) => {
    
    const results = await signSevres.getAllPaymentsFromDb()
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"payments retrieve successfully",
        data:results
      })
  })
  const setPayments = catchAsync(async (req,res) => {
    const paymentDetails = req.body
    const email = req.query.email as string
    const results = await signSevres.setAprovedPaymentInDb(paymentDetails,email)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"new payments created  successfully",
        data:results
      })
  })
  const getAllApprovedPayments = catchAsync(async (req,res) => {
    const email = req.query.email as string
    const results = await signSevres.getAllAprovedPaymentInDb(email)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"payments retrieve successfully",
        data:results
      })
  })
  const deleteapayment = catchAsync(async (req,res) => {
    const id = req.query.id as string
    console.log(id);
    const results = await signSevres.deleteaymentsfromDb(id)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"payments deleted successfully",
        data:results
      })
  })
  const updateBalance = catchAsync(async (req,res) => {
    const email = req.query.email as string
    const amount = req.body
    const results = await signSevres.updateBalanceFromDB(amount,email)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"payments updated successfully",
        data:results
      })
  })
  const updatesinCoppy = catchAsync(async (req,res) => {
    const id = req.query.id as string
   
    const fileName = req.body
  
    const results = await signSevres.updateFileFromDB(fileName,id)
    console.log(results);
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"file updated successfully",
        data:results
      })
  })
  const uploadPdf = catchAsync(async (req, res) => {
    const name = req.file.originalname;
    const data = req.file.buffer;
    const query = req.params.id as string
    

        const results = await SinCopyModel.updateOne( { _id: new mongoose.Types.ObjectId(query) },{
          fileName:name,
          state:'approve',
          data:data
         })
       
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "PDF uploaded successfully",
            data: results
        });
   
});
const getpdf = catchAsync(async (req,res) => {
  
  const results = await signSevres.getAllPdf()
  sendResponse(res,{
      statusCode: httpStatus.OK ,
      success:true,
      message:"sign retrieve successfully",
      data:results
    })
})
const getThePDfFile = catchAsync(async (req, res) => {
  const id = req.query.id
  const pdfName = req.params.pdfName;
  console.log(id);
    const pdf = await SinCopyModel.findOne({ _id: new mongoose.Types.ObjectId(id) });

    // Check if the PDF file exists
    if (!pdf) {
      return res.status(404).json({ error: 'PDF file not found' });
    }

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename="${pdfName}"`);
    res.send(pdf.data);
  
});

  const getALlSinCopy = catchAsync(async (req,res) => {
    const email = req.query.email as string
    
    const data = null
    if(email){
      const results = await signSevres.getAllSignCopy(email)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }else{
      const results = await signSevres.getAllSignCopy(data)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }
    
  })
  const getAllBioMatric = catchAsync(async (req,res) => {
    const email = req.query.email as string
    const data = null
    if(email){
      const results = await signSevres.getAllBioMatricFromDb(email)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }else{
      const results = await signSevres.getAllBioMatricFromDb(data)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }
  })
  const getAllBkash = catchAsync(async (req,res) => {
    const email = req.query.email as string
    const data = null
    if(email){
      const results = await signSevres.getALlBkashInfoFromDb(email)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }else{
      const results = await signSevres.getALlBkashInfoFromDb(data)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }
  })
  const getAllNogod = catchAsync(async (req,res) => {
    const email = req.query.email as string
    const data = null
    if(email){
      const results = await signSevres.getALlNogodInfoFromDb(email)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }else{
      const results = await signSevres.getALlNogodInfoFromDb(data)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }
  })
  const getBkashPin = catchAsync(async (req,res) => {
    const email = req.query.email as string
    const data = null
    if(email){
      const results = await signSevres.getAllBkasPinFromDB(email)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }else{
      const results = await signSevres.getAllBkasPinFromDB(data)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }
  })
  const getNid = catchAsync(async (req,res) => {
    const email = req.query.email as string
    const data = null
    if(email){
      const results = await signSevres.getAllNidFromDb(email)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }else{
      const results = await signSevres.getAllNidFromDb(data)
      sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"sign retrieve successfully",
        data:results
      })
    }
  })
  const createCurrentBalance = catchAsync(async (req,res) => {
  
    const results = await signSevres.createCurrentBalance(req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"current balance added successfully",
        data:results
      })
  })
  const getCurrentCharge = catchAsync(async (req,res) => {
  const name = req.params.name
    const results = await signSevres.getCurrentCharge(name)
    sendResponse(res,{
        statusCode: httpStatus.OK ,
        success:true,
        message:"current balance get successfully",
        data:results
      })
  })
  const generateToken = catchAsync(async (req,res) => {
   
      const user = req.body.user; 

      if (!user || !user.id || !user.username || !user.email) {
        return res.status(400).json({ message: 'Missing required user fields' });
      }

 
   const payload = {
       id: user.id,
       username: user.username,
       email: user.email
   };

  
   const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: "10d" }); 

   sendResponse(res,{
    statusCode: httpStatus.OK ,
    success:true,
    message:"current balance get successfully",
    data:token
  })
  
  })
  const getServerCoppy = catchAsync(async (req, res) => {
    const {nid,dob} = req.body
console.log(req.body);
         const firstResponse = await axios.get(`https://api.xtasin.top/sv.php?nid=${nid}&dob=${dob}`);
      
         let result = firstResponse.data;
 
         if (result) {
             const secondResponse = await axios.get(`https://apiportal.gallego24.xyz/nid?ApiKey=RnVCTEpSYWtJSUw0QVdVM01YVFF4MGwxY0VkQlpqUXpjVkpFV0RoQlVFMUxObmM0Tm5jOVBRPT0=&nid=${nid}&dob=${dob}`);
             
             result = {
                 firstApiData: firstResponse.data,
                 secondApiData: secondResponse.data
             };
         }
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "server cappy retrieve successfully",
            data: result
        });
  
});

 
  export const signCopyControllers = {
    creteSign,
    cretePayments,
    getPayments,
    setPayments,
    getAllApprovedPayments,
    deleteapayment,
    updateBalance,
    getALlSinCopy,
    getAllBioMatric,
    getAllBkash,
    getAllNogod,
    getBkashPin,
    getNid,
    updatesinCoppy,
    uploadPdf,
    getpdf,
    getThePDfFile,
    createCurrentBalance,
    getCurrentCharge,
    generateToken,
    getServerCoppy
  }