import { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddleware from '../middleware/user';

class User {

    constructor(private Router: Router) {
        this.ConfigRouter();
    }

    private ConfigRouter() {
        this.Router.get('/user', UserController.Get);
        this.Router.get('/user/:id', UserController.GetId);
        this.Router.post('/user',UserMiddleware.IsValidUser, UserController.Post);
        this.Router.put('/user', UserController.Put);
        this.Router.delete('/user', UserController.Delete);
    }

}

export default User;