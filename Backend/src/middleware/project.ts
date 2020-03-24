import { ProjectSchema } from '../models/project';
import { Request, Response, NextFunction } from 'express';
import AppConfig from '../Config/app';

class Project {
    private static instance: Project;

    public static getInstance(): Project {
        if (!Project.instance) {
            Project.instance = new Project();
        }
        return Project.instance;
    }

    public async IsValidProject(req: Request, res: Response, next: NextFunction) {
        try {
            await ProjectSchema.validateAsync(req.body);
        } catch (error) {
            return res.status(406).json({ StatusCode: 406, Message: error, CodeError: AppConfig.OBJECT_DATA_NOT_VALID, Error: true });
        }
        next();
    }

}

export default Project.getInstance();