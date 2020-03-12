import Controller, { ValidateError } from '../models/controller';
import { Response, Request } from 'express';
import ResponseData from '../models/response_data';
import AppConfig from '../Config/app';
import AuthController from './auth';

class User extends Controller {

    constructor() { super(); }

    Get(req: Request, res: Response): Promise<Response<ResponseData>> {
        throw new Error("Method not implemented.");
    }

    async GetId(req: Request, res: Response): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('EmailAddress', req.headers.EmailAddress ?? req.headers.emailaddress)
                    .input('Id', req.headers.Id ?? req.headers.id)
                    .execute('GetUser');
                return res.status(200).json({ StatusCode: 200, Message: result.recordset, CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    async Post(req: Request, res: Response): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                await AuthController.SendEmail(req.body.EmailAddress, req.body.Code);
                let result = await AppConfig.SQLInstance.request()
                    .input('EmailAddress', req.body.EmailAddress)
                    .input('Username', req.body.Username)
                    .input('Password', req.body.Password)
                    .input('FirstName', req.body.FirstName)
                    .input('LastName', req.body.LastName)
                    .input('Gender', req.body.Gender)
                    .input('EmailValidationCode', req.body.Code)
                    .execute('CreateUser');
                return res.status(202).json({ StatusCode: 202, Message: { Id: result.recordset[0].Id, Email: req.body.EmailAddress }, CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    async PostLogin(req: Request, res: Response): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('User', req.body.User)
                    .input('Password', req.body.Password)
                    .execute('LoginUser');
                return res.status(200).json({ StatusCode: 200, Message: result.recordset, CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    Put(req: Request, res: Response): Promise<Response<ResponseData>> {
        throw new Error("Method not implemented.");
    }

    async PutEmailValidationCode(req: Request, res: Response): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('User', req.headers.User)
                    .input('Id', req.headers.Id)
                    .input('Code', req.params.Code)
                    .execute('ValidateEmail');
                return res.status(200).json({ StatusCode: 200, Message: result.recordset, CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {

        }
    }

    Delete(req: Request, res: Response): Promise<Response<ResponseData>> {
        throw new Error("Method not implemented.");
    }

}

export default new User();
