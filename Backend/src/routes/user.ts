import { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddleware from '../middleware/user';

class User {

    constructor(private Router: Router) {
        this.ConfigRouter();
    }

    private ConfigRouter() {
        this.Router.get('/user', UserMiddleware.IsValidToken, UserMiddleware.IsValidPagination, UserController.Get);
        this.Router.get('/user/id', UserMiddleware.IsValidToken, UserController.GetId);
        this.Router.post('/auth/signup', UserMiddleware.IsValidUser, UserMiddleware.IsValidEmail, UserController.Post);
        this.Router.post('/auth/login', UserMiddleware.IsValidLogin, UserController.PostLogin);
        this.Router.put('/user', UserMiddleware.IsValidToken, UserMiddleware.IsValidUpdate, UserController.Put);
        this.Router.put('/user/image', UserMiddleware.IsValidToken, UserMiddleware.IsValidImage, UserController.PutImage);
        this.Router.put('/auth/email', UserMiddleware.IsValidCode, UserController.PutEmailValidationCode);
        this.Router.delete('/user', UserMiddleware.IsValidToken, UserController.Delete);
    }

}

export default User;