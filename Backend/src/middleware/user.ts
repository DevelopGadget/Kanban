import { OptionalUserObject, RequiredUserObject, Login } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import AppConfig from '../Config/app';
import AuthController from '../controllers/auth';

class User {

    private static instance: User;

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    /**
     * IsValidUser
     */
    public async IsValidUser(req: Request, res: Response, next: NextFunction) {
        try {
            await RequiredUserObject.keys(OptionalUserObject).validateAsync(req.body);
            req.body.Username = req.body.EmailAddress.split('@')[0];
            req.body.Code = await AuthController.CreateCode();
        } catch (error) {
            return res.status(406).json({ StatusCode: 406, Message: error, CodeError: AppConfig.OBJECT_DATA_NOT_VALID, Error: true });
        }
        next();
    }

    public async IsValidLogin(req: Request, res: Response, next: NextFunction) {
        try {
            await Login.validateAsync(req.body);
        } catch (error) {
            return res.status(406).json({ StatusCode: 406, Message: error, CodeError: AppConfig.OBJECT_DATA_NOT_VALID, Error: true });
        }
        next();
    }

}

export default User.getInstance();