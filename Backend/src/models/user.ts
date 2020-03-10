import * as Joi from '@hapi/joi';

interface User {

    Id: string;
    FirstName: string;
    LastName: string;
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
    FirstName: Joi.string().required().max(100),
    LastName: Joi.string().required().max(100)
});

export const OptionalUserObject: Joi.SchemaMap = {
    Gender: Joi.string().valid('M', 'F').optional(),
    EmailValidationCode: Joi.string().optional(),
    EmailValidationCode_IsValidated: Joi.binary().optional(),
    CountryCode: Joi.string().optional().max(5),
    CityName: Joi.string().optional()
};