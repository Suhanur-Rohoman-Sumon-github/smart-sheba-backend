import { Router } from "express";
import { UserRouter } from "../modules/user/user.route";
import { SignCopyRoute } from "../modules/signCoppy/signCopy.route";


const router = Router()

const moduleRoute = [
    {
        path:"/",
        route:UserRouter
    },
    {
        path:"/",
        route:SignCopyRoute
    }
    
]

moduleRoute.forEach(routes=>router.use(routes.path,routes.route))


export default router