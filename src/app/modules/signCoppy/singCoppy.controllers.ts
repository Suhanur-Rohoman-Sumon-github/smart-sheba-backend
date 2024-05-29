import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendRespons"
import httpStatus from "http-status"
import multer from 'multer';
import { signSevres } from "./signCoppy.services"
import { pdfModel } from "./signCoppy.model";
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

    try {
        // Create a new instance of the pdfModel
        const pdf = new pdfModel({
            name: name,
            data: data
        });

        // Save the PDF document to MongoDB
        const result = await pdf.save();

        // Send response
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "PDF uploaded successfully",
            data: result
        });
    } catch (error) {
        // Handle errors
        sendResponse(res, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Failed to upload PDF",
            error: error.message
        });
    }
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
  const pdfName = req.params.pdfName;

  try {
    // Fetch the PDF file from the database by name
    const pdf = await pdfModel.findOne({ name: pdfName });

    // Check if the PDF file exists
    if (!pdf) {
      return res.status(404).json({ error: 'PDF file not found' });
    }

    res.set('Content-Type', 'application/pdf');
res.set('Content-Disposition', `attachment; filename="${pdfName}"`);
res.send(pdf.data);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).json({ error: 'Failed to fetch PDF' });
  }
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
    getThePDfFile
  }