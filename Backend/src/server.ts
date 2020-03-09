import App from './index';
import AppConfig from './Config/app';

class Server {
    /**
     * InitServer
     */
    public async InitServer() {
        try { await AppConfig.InitEnviroment(); } catch (error) { }
        App.RunServer();
    }
}

new Server().InitServer();