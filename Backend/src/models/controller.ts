import { Response, Request } from 'express';
import ResponseData from './response_data';
import AppConfig from '../Config/app';

export default abstract class Controller {
    abstract Get(req: Request, res: Response): Promise<Response<ResponseData>>;
    abstract GetId(req: Request, res: Response): Promise<Response<ResponseData>>;
    abstract Post(req: Request, res: Response): Promise<Response<ResponseData>>;
    abstract Put(req: Request, res: Response): Promise<Response<ResponseData>>;
    abstract Delete(req: Request, res: Response): Promise<Response<ResponseData>>;
}

export const ValidateError = (DataError: any, User: string = ''): ResponseData => {
    try {
        if (DataError.originalError.info.message.includes('2627'))
            return { StatusCode: 409, Message: DataError, CodeError: AppConfig.EMAIL_DUPLICATE, IsError: true };
        else if (DataError.originalError.info.message.includes('A002'))
            return { StatusCode: 201, Message: DataError, CodeError: AppConfig.INACTIVE_USER, IsError: true };
        else if (DataError.originalError.info.message.includes('A003'))
            return { StatusCode: 401, Message: DataError, CodeError: AppConfig.INVALID_PASSWORD, IsError: true };
        else if (DataError.originalError.info.message.includes('A004'))
            return { StatusCode: 202, Message: { 'Id': DataError.originalError.info.message.split(' ')[2], User }, IsError: true, CodeError: AppConfig.NOT_VERIFIED_EMAIL };
        else if (DataError.originalError.info.message.includes('A005'))
            return { StatusCode: 203, Message: DataError, IsError: true, CodeError: AppConfig.VERIFIED_EMAIL };
        else if (DataError.originalError.info.message.includes('A006'))
            return { StatusCode: 406, Message: DataError, IsError: true, CodeError: AppConfig.INVALID_CODE };
        else if (DataError.originalError.info.message.includes('E404'))
            return { StatusCode: 404, Message: DataError, IsError: true, CodeError: AppConfig.USER_NOT_FOUND };
    } catch (error) { }
    return { IsError: true, StatusCode: 400, Message: DataError, CodeError: AppConfig.ERROR_IN_REQUEST };
}