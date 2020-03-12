import { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddleware from '../middleware/user';

class User {

    constructor(private Router: Router) {
        this.ConfigRouter();
    }

    private ConfigRouter() {
        this.Router.get('/user', UserController.Get);
        this.Router.get('/user/id', UserController.GetId);
        this.Router.post('/user/auth/signup',UserMiddleware.IsValidUser, UserController.Post);
        this.Router.post('/user/auth/login',UserMiddleware.IsValidLogin, UserController.PostLogin);
        this.Router.put('/user', UserController.Put);
        this.Router.put('/user/email', UserController.PutEmailValidationCode);
        this.Router.delete('/user', UserController.Delete);
    }

}

export default User;