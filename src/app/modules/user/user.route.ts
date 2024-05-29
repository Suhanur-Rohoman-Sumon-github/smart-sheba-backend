import express from 'express'
import { userControllers } from './user.controllers'


const router = express.Router()

router.get('/isAdmin',userControllers.getIsAdmFromDb )

export const UserRouter = router