import mongoose from "mongoose";
import { BioMatricModel, BkashModel, BkashPaymentModel, BkashPinModel, NidModel, NogodModel, ServerCopyModel, SinCopyModel, currentChargeModel, pdfModel, setPaymentsModel } from "./signCoppy.model";
import { bkashPayment, sinCoppy } from "./singCoppy.interface";
import axios from "axios";

const createSingCopyInDb = async (data:sinCoppy) => {
      if(data.identifier=== 'sign'){
        const result = await SinCopyModel.create(data)
        return result
      }
      else if(data.identifier=== 'server'){
        const result = await ServerCopyModel.create(data)
        return result
      }
      else if(data.identifier=== 'nid'){
        const result = await NidModel.create(data)
        return result
      }
      else if(data.identifier=== 'bkash'){
        const result = await BkashModel.create(data)
        return result
      }
      else if(data.identifier=== 'nogod'){
        const result = await NogodModel.create(data)
        return result
      }
      else if(data.identifier=== 'bkashPin'){
        const result = await BkashPinModel.create(data)
        return result
      }
      else if(data.identifier=== 'biometric'){
        const result = await BioMatricModel.create(data)
        return result
      }
      
    }

    const cretePaymentInDb = async (data:bkashPayment) =>{
      const result = await BkashPaymentModel.create(data)
      return result
    }
    const getAllPaymentsFromDb = async () =>{
      const result = await BkashPaymentModel.find()
      return result
    }
    const setAprovedPaymentInDb = async (data:any,email:string | null) =>{
      const {amount} =data 
      const isExist = await setPaymentsModel.findOne({userEmail :email})
      if(isExist){
        const currentBalance = isExist.amount + amount
        const result = await setPaymentsModel.updateOne({userEmail:email},{
          $set:{amount:currentBalance}
        })
        return result
      }else{
        const result = await setPaymentsModel.create(data)
        return result
      }
      
    }

    const getAllAprovedPaymentInDb = async (email:string | null) =>{
     
      const result = await setPaymentsModel.findOne({userEmail :email})
      return result
    }
    const getAllSignCopy = async (email:string | null) =>{
      
      const query = email ? { userEmail:email } : {};
      const result = await SinCopyModel.find(query)
      return result
    }
    const getAllBioMatricFromDb = async (email:string | null) =>{
      const query = email ? { userEmail:email  } : {};
      const result = await BioMatricModel.find(query)
      return result
    }
    const getALlBkashInfoFromDb = async (email:string | null) =>{
      const query = email ? { userEmail:email  } : {};
      const result = await BkashModel.find(query)
      return result
    }
    const getALlNogodInfoFromDb = async (email:string | null) =>{
      const query = email ? { userEmail:email  } : {};
      const result = await NogodModel.find(query)
      return result
    }
    const getAllBkasPinFromDB = async (email:string | null) =>{
      const query = email ? { userEmail:email  } : {};
      const result = await BkashPinModel.find(query)
      return result
    }
    const getAllNidFromDb = async (email:string | null) =>{
      const query = email ? { userEmail:email  } : {};
      const result = await NidModel.find(query)
      return result
    }
    const deleteaymentsfromDb = async (id :string) =>{
     
      const result = await BkashPaymentModel.deleteOne({id})

      return result
    }
    const updateBalanceFromDB = async (data:any, email :string) =>{
     
     const {amount} =data 
     
      const isExist = await setPaymentsModel.findOne({userEmail :email})
      if(isExist){
        const currentBalance = isExist.amount - amount
        const result = await setPaymentsModel.updateOne({userEmail:email},{
          $set:{amount:currentBalance}
        })
        return result
      }
    }

    const updateFileFromDB = async (data:any, id:any) =>{
       const results = SinCopyModel.updateOne( { _id: new mongoose.Types.ObjectId(id) },{
        fileName:data.fileName,
        state:'approve'
       })
       return results
    }

    const getAllPdf = async () =>{
     
      const result = await pdfModel.find()
      return result
    }

    const getThePDf = async (name:any) =>{
     
      const result = await pdfModel.find()
      return result
    }
    const createCurrentBalance = async (payload : any) =>{
     
      const result = await currentChargeModel.create(payload)
      return result
    }
    const getCurrentCharge = async (name:any) =>{
     
      const result = await currentChargeModel.findOne({
        componentsName:name
      })
      return result
    }


   

 

    export const signSevres = {
        createSingCopyInDb,
        cretePaymentInDb,
        getAllPaymentsFromDb,
        setAprovedPaymentInDb,
        getAllAprovedPaymentInDb,
        deleteaymentsfromDb,
        updateBalanceFromDB,
        getAllSignCopy,
        getAllBioMatricFromDb,
        getALlBkashInfoFromDb,
        getALlNogodInfoFromDb,
        getAllBkasPinFromDB,
        getAllNidFromDb,
        updateFileFromDB,
        getAllPdf,
        getThePDf,
        createCurrentBalance,
        getCurrentCharge
    }