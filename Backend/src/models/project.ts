import User from "./user";
import Joi from "@hapi/joi";

export default interface Project {

    Id: string;
    Name: string;
    Decription?: string;
    CreateAt: Date;
    Admin: string;
    IsActiveProject: boolean;
    Members: Array<User>;

}

export const ProjectSchema: Joi.ObjectSchema = Joi.object({
    Name: Joi.string().when('IsUpdate', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    Description: Joi.string().optional(),
    IsUpdate: Joi.bool().default(false)
});