import { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddleware from '../middleware/user';

class User {

    constructor(private Router: Router) {
        this.ConfigRouter();
    }

    private ConfigRouter() {
        this.Router.get('/user', UserMiddleware.IsValidToken, UserController.Get);
        this.Router.get('/user/id', UserMiddleware.IsValidToken, UserController.GetId);
        this.Router.post('/user/auth/signup', UserMiddleware.IsValidUser, UserController.Post);
        this.Router.post('/user/auth/login', UserMiddleware.IsValidLogin, UserController.PostLogin);
        this.Router.put('/user', UserMiddleware.IsValidToken, UserController.Put);
        this.Router.put('/user/email/:Code', UserMiddleware.IsValidToken, UserController.PutEmailValidationCode);
        this.Router.delete('/user', UserMiddleware.IsValidToken, UserController.Delete);
    }

}

export default User;