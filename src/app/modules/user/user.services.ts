import { UserDocument } from "./user.interface";
import { UserModel } from "./user.model";

// create  a new user into db

    const getIsAdminDB = async (email:string) => {
      const user = await UserModel.findOne({ email });
      const isAdmin = user?.role === 'admin';
      
      return {isAdmin };
    }

    export const userSevres = {
      getIsAdminDB
    }

  