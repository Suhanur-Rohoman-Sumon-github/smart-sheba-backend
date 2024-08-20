import mongoose, { Schema } from "mongoose";
import { bkash, bkashPayment, sinCoppy } from "./singCoppy.interface";

// sing copy schema

const SinCopySchema: Schema = new Schema({
    identifier:{type:String,},
    selectType: { type: String, },
    formNumber: { type: Number, },
    signCopyDetails: { type: String, },
    userEmail : {type:String},
    state:{type:String, default:'pending'},
    fileName:{type:String},
    data:Buffer
});
const BioMatricShema: Schema = new Schema({
    identifier:{type:String,},
    selectType: { type: String, },
    formNumber: { type: Number, },
    signCopyDetails: { type: String, },
    userEmail : {type:String},
    state:{type:String, default:'pending'}
});

// server copy schema
const ServerCopySchema: Schema = new Schema({
    identifier:{type:String,},
    selectType: { type: String, },
    formNumber: { type: Number, },
    signCopyDetails: { type: String, }
});

// Nid copy schema
const NidSchema: Schema = new Schema({
    identifier:{type:String,},
    selectType: { type: String, },
    formNumber: { type: Number, },
    signCopyDetails: { type: String, },
    userEmail : {type:String},
    state:{type:String, default:'pending'}
});

// bkash  schema
const bkashSchema: Schema = new Schema({
    identifier:{type:String,},
    formNumber: { type: Number, },
    signCopyDetails: { type: String, },
    userEmail : {type:String},
    state:{type:String, default:'pending'}
});
// nogod  schema
const nogodSchema: Schema = new Schema({
    identifier:{type:String,},
    formNumber: { type: Number, },
    signCopyDetails: { type: String, },
    userEmail : {type:String},
    state:{type:String, default:'pending'}
});

// bkash Pin Schema
const bkashPinSchema: Schema = new Schema({
    identifier:{type:String,},
    formNumber: { type: Number, },
    signCopyDetails: { type: String, },
    userEmail : {type:String},
    state:{type:String, default:'pending'}
});

// payment schema
const bkashPaymentSchema: Schema = new Schema({
    userName:{type:String,},
    userEmail: { type: String, },
    phoneNumber: { type: Number, },
    transactionId: { type: String, },
    amount:Number,
    state:String,
    id:String
});
const setPaymentsSchema: Schema = new Schema({
  
    userEmail: { type: String, },
   
    amount:{type:Number},
   
});

 const pdfSchema = new mongoose.Schema({
    name: String,
    data: Buffer
  });
 const currentCharge = new mongoose.Schema({
    componentsName: String,
    amount: Number
  });

  export const pdfModel = mongoose.model('PDF', pdfSchema);
  export const currentChargeModel = mongoose.model('currentCharge', currentCharge);

// sing copy model
export const SinCopyModel = mongoose.model<sinCoppy>('SinCopy', SinCopySchema);

// server copy model
export const ServerCopyModel = mongoose.model<sinCoppy>('ServerCopy', ServerCopySchema);

// Nid  model
export const NidModel = mongoose.model<sinCoppy>('Nid', NidSchema);

// bkash model
export const BkashModel = mongoose.model<bkash>('bkash', bkashSchema);

// bkash model
export const NogodModel = mongoose.model<bkash>('nogod', nogodSchema);

// bkashPin model
export const BkashPinModel = mongoose.model<bkash>('bkashPin', bkashPinSchema);

// // bkashPayment model
export const BkashPaymentModel = mongoose.model<bkashPayment>('bkashPayments', bkashPaymentSchema);
export const setPaymentsModel = mongoose.model<bkashPayment>('approvedPayments', setPaymentsSchema);
export const BioMatricModel = mongoose.model<bkashPayment>('biomatric', BioMatricShema);
