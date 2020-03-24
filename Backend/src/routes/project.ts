import { Router } from 'express';
import ProjectMiddleware from '../middleware/project';
import ProjectController from '../controllers/project';
import UserMiddleware from '../middleware/user';

export default class Project {
    constructor(private Router: Router) {
        this.ConfigRouter();
    }

    private ConfigRouter() {
        this.Router.get('/project', UserMiddleware.IsValidToken, UserMiddleware.IsValidPagination, ProjectController.Get);
        this.Router.get('/project/:Id', UserMiddleware.IsValidToken, ProjectController.GetId);
        this.Router.post('/project', ProjectMiddleware.IsValidProject, ProjectController.Post);
        this.Router.put('/project', UserMiddleware.IsValidToken, UserMiddleware.IsValidUpdate, ProjectController.Put);
        this.Router.delete('/project', UserMiddleware.IsValidToken, ProjectController.Delete);
    }
}