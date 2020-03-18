import * as Joi from '@hapi/joi';

interface User {

    Id: string;
    FirstName?: string;
    LastName?: string;
    EmailAdress: string;
    UrlImage?: string;
    Username: string;
    Gender?: string;
    EmailValidationCode_IsValidated: number;
    IsActiveUser: number;
    CountryCode?: string;
    CityName?: string;

}

export default User;

export const RequiredUserObject: Joi.ObjectSchema = Joi.object({
    EmailAddress: Joi.string().email().required(),
    Password: Joi.string().required().min(8).max(16).regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)),
    FirstName: Joi.string().required().max(100),
    LastName: Joi.string().required().max(100),
    EmailValidationCode: Joi.string().optional(),
});

export const OptionalUserObject: Joi.SchemaMap = {
    Gender: Joi.string().valid('M', 'F').optional(),
    CountryCode: Joi.string().optional().max(5),
    CityName: Joi.string().optional()
};

export const ImageModel: Joi.ObjectSchema = Joi.object({
    UrlImage: Joi.string().dataUri().required(),
    ExtPath: Joi.string().valid('.jpeg', '.jpg', '.png', '.svg').required()
});

export const OptionalUserUpdate: Joi.ObjectSchema = Joi.object({
    FirstName: Joi.string().optional().max(100),
    LastName: Joi.string().optional().max(100),
});

export const Pagination: Joi.ObjectSchema = Joi.object({
    PageNumber: Joi.number().default(1).optional(),
    PageSize: Joi.number().default(100).optional(),
});

export const ValidationCode: Joi.ObjectSchema = Joi.object({
    Id: Joi.string().required(),
    User: Joi.string().required(),
    Code: Joi.string().optional(),
    IsReSend: Joi.bool().required(),
});

export const Login: Joi.ObjectSchema = Joi.object({
    User: Joi.string().required(),
    Password: Joi.string().required().min(8).max(16).regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)),
});