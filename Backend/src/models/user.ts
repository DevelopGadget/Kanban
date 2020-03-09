import * as Joi from '@hapi/joi';

interface User {

    Id: string;
    Name: string;
    EmailAdress: string;
    Username: string;
    Gender: string;
    EmailValidationCode_IsValidated: number;
    IsActiveUser: number;
    CountryCode: string;
    CityName: string;

}

export default User;

export const RequiredUserObject: Joi.ObjectSchema = Joi.object({
    EmailAddress: Joi.string().email().required(),
    Password: Joi.string().required().min(8).max(16).regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)),
    Name: Joi.string().required()
});

export const OptionalUserObject: Joi.SchemaMap = {
    Gender: Joi.string().valid('M', 'F').optional(),
    EmailValidationCode: Joi.string().optional(),
    EmailValidationCode_IsValidated: Joi.binary().optional(),
    CountryCode: Joi.string().optional(),
    CityName: Joi.string().optional()
};