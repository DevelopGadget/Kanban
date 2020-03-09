import Controller from '../models/controller';
import { Response, Request } from 'express';
import ResponseData from '../models/response_data';
import AppConfig from '../Config/app';
import AuthController from './auth';

class User implements Controller {

    Get(req: Request, res: Response): Promise<Response<ResponseData>> {
        throw new Error("Method not implemented.");
    }

    GetId(req: Request, res: Response): Promise<Response<ResponseData>> {
        throw new Error("Method not implemented.");
    }

    async Post(req: Request, res: Response): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            req.body.Password = AuthController.CryptoData(req.body.Password, true);
            try {
                req.body.Code = await AuthController.CreateCode();
                await AuthController.SendEmail(req.body.EmailAddress, req.body.Code);
                let result = await AppConfig.SQLInstance.request()
                    .input('EmailAddress', req.body.EmailAddress)
                    .input('Username', req.body.Username)
                    .input('Password', req.body.Password)
                    .input('Name', req.body.EmailAddress)
                    .input('Gender', req.body.Gender)
                    .input('EmailValidationCode', req.body.Code)
                    .execute('CreateUser');
                return res.status(202).json({ StatusCode: 202, Message: { Id: result.recordset[0].Id, Email: req.body.EmailAddress }, CodeError: null, IsError: false });
            } catch (error) {
                return res.status(400).json({ StatusCode: 400, Message: error, CodeError: AppConfig.DATABASE_CREATE_USER, IsError: true });
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    Put(req: Request, res: Response): Promise<Response<ResponseData>> {
        throw new Error("Method not implemented.");
    }
    
    Delete(req: Request, res: Response): Promise<Response<ResponseData>> {
        throw new Error("Method not implemented.");
    }

}

export default new User();
