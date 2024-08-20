import express from 'express'
import { signCopyControllers } from './singCoppy.controllers'
import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.post('/create-sign-copy', signCopyControllers.creteSign )
router.post('/createPayment', signCopyControllers.cretePayments )
router.get('/payments', signCopyControllers.getPayments )
router.get('/get-all-sign-copy', signCopyControllers.getALlSinCopy )
router.get('/get-all-biometric', signCopyControllers.getAllBioMatric )
router.get('/get-all-bkash-info', signCopyControllers.getAllBkash )
router.get('/get-all-nogod-info', signCopyControllers.getAllNogod )
router.get('/get-all-bkash-pin', signCopyControllers.getBkashPin )
router.get('/get-all-nid', signCopyControllers.getNid )
router.post('/set-payments', signCopyControllers.setPayments )
router.get('/get-payments', signCopyControllers.getAllApprovedPayments )
router.delete('/delete-payments', signCopyControllers.deleteapayment )
router.patch('/update-payments', signCopyControllers.updateBalance )
router.patch('/update-sin-copy', signCopyControllers.updatesinCoppy )
router.post('/upload/:id',upload.single('pdf'), signCopyControllers.uploadPdf )
router.get('/get-pdf', signCopyControllers.getpdf )
router.get('/pdfs/:pdfName', signCopyControllers.getThePDfFile )
router.post('/create-currentBalance', signCopyControllers.createCurrentBalance )
router.get('/currentBalance/:name', signCopyControllers.getCurrentCharge )
router.post('/genaretToken', signCopyControllers.generateToken )
router.post('/getServerCopy', signCopyControllers.getServerCoppy )

export const SignCopyRoute = router