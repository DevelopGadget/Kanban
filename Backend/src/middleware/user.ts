import { OptionalUserObject, RequiredUserObject, Login, OptionalUserUpdate, Pagination, ValidationCode } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import AppConfig from '../Config/app';
import AuthController from '../controllers/auth';
import { validate, EmailDomainValidatorResponse } from 'email-domain-validator';
class User {

    private static instance: User;

    public static getInstance(): User {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

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

    public async IsValidUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            await OptionalUserUpdate.keys(OptionalUserObject).validateAsync(req.body);
        } catch (error) {
            return res.status(406).json({ StatusCode: 406, Message: error, CodeError: AppConfig.OBJECT_DATA_NOT_VALID, Error: true });
        }
        next();
    }

    public async IsValidPagination(req: Request, res: Response, next: NextFunction) {
        try {
            await Pagination.validateAsync(req.body);
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

    public async IsValidCode(req: Request, res: Response, next: NextFunction) {
        try {
            await ValidationCode.validateAsync(req.body);
        } catch (error) {
            return res.status(406).json({ StatusCode: 406, Message: error, CodeError: AppConfig.OBJECT_DATA_NOT_VALID, Error: true });
        }
        next();
    }

    public async IsValidToken(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization)
            return res.status(401).json({ StatusCode: 406, Message: 'INVALID_TOKEN', CodeError: AppConfig.INVALID_TOKEN, Error: true });

        try {
            const token = req.headers.authorization.split(' ')[1];
            const response = await AuthController.DecodeToken(token);
            if (!response.IsError) {
                req.headers.Id = response.Message.sub;
                req.headers.User = response.Message.EmailAddress;
                next();
            }
            else {
                return res.status(response.StatusCode).json(response);
            }
        } catch (error) {
            return res.status(400).json({ StatusCode: 400, Message: 'ERROR_IN_REQUEST', CodeError: AppConfig.ERROR_IN_REQUEST, Error: true });
        }
    }

    public async IsValidEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = await validate(req.body.EmailAddress);
            if (!(email as EmailDomainValidatorResponse).isValidDomain)
                return res.status(406).json({ StatusCode: 406, Message: 'INVALID_EMAIL', CodeError: AppConfig.OBJECT_DATA_NOT_VALID, Error: true });
        } catch (error) {
            return res.status(406).json({ StatusCode: 406, Message: 'INVALID_EMAIL', CodeError: AppConfig.OBJECT_DATA_NOT_VALID, Error: true });
        }
        next();
    }

}

export default User.getInstance();