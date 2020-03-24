import Controller, { ValidateError } from '../models/controller';
import { Response, Request } from 'express';
import AppConfig from '../Config/app';
import ResponseData from '../models/response_data';

class Project extends Controller {

    constructor() { super(); }

    async Get(req: Request, res: Response<any>): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('Id', req.headers.Id ?? req.headers.id)
                    .input('PageNumber', req.body.PageNumber)
                    .input('PageSize', req.body.PageSize)
                    .execute('GetAllProject');
                return res.status(200).json({ StatusCode: 200, Message: result.recordset, CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    async GetId(req: Request, res: Response<any>): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('IdUser', req.headers.Id ?? req.headers.id)
                    .input('IdProject', req.params.Id ?? req.params.id)
                    .execute('GetProject');
                result.recordset[0].Members = JSON.parse(result.recordset[0].Members);
                return res.status(200).json({ StatusCode: 200, Message: result.recordset[0], CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    async Post(req: Request, res: Response<any>): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('IdUser', req.headers.Id ?? req.headers.id)
                    .input('Name', req.body.Name)
                    .input('Description', req.body.Description)
                    .execute('CreateProject');
                return res.status(200).json({ StatusCode: 200, Message: result.recordset[0], CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    async Put(req: Request, res: Response<any>): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('IdUser', req.headers.Id ?? req.headers.id)
                    .input('Name', req.body.Name)
                    .input('Type', 1)
                    .input('Description', req.body.Description)
                    .input('Id', req.params.Id ?? req.params.id)
                    .execute('UpdateProject');
                return res.status(200).json({ StatusCode: 200, Message: result.recordset[0], CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

    async Delete(req: Request, res: Response<any>): Promise<Response<ResponseData>> {
        if (AppConfig.SQLInstance) {
            try {
                let result = await AppConfig.SQLInstance.request()
                    .input('IdUser', req.headers.Id ?? req.headers.id)
                    .input('Type', 0)
                    .input('Id', req.params.Id ?? req.params.id)
                    .execute('UpdateProject');
                return res.status(200).json({ StatusCode: 200, Message: result.recordset, CodeError: null, IsError: false });
            } catch (error) {
                const dataError = ValidateError(error);
                return res.status(dataError.StatusCode).json(dataError);
            }
        } else {
            return res.status(500).json({ StatusCode: 500, Message: 'DATABASE_NOT_INIT', CodeError: AppConfig.DATABASE_NOT_INIT, IsError: true });
        }
    }

}

export default new Project();