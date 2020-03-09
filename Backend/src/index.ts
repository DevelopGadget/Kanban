import express, { json, urlencoded, NextFunction, Response, Request } from 'express';
import morgan from 'morgan';
import User from './routes/user';
import Config from './Config/app';

class Index {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.AppConfig();
    }

    private AppConfig() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(json());
        this.app.use(this.defaultHeader);
        this.app.use(urlencoded({ extended: false }));
        this.ConfigRouters();
    }

    private ConfigRouters() {
        new User(this.app);
    }

    private defaultHeader(req: Request, res: Response, next: NextFunction) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Accept', 'application/json');
        next();
    }

    public RunServer() {
        this.app.listen(3000, async () => {
            await Config.InitDatabase();
            console.log('server start');
        });
    }
}

export default new Index();