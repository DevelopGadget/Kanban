import MessageCodes from '../models/message_codes';
import SQL from 'mssql';
import { resolve } from 'path';

class App {

    private static instance: App;

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    public async InitEnviroment() {
        try {
            (await import('dotenv')).config({ path: resolve(__dirname, '../../.env.test') });
        } catch (error) { }
        this.InitVariables();
    }

    public async InitDatabase () {
        try {
           this.SQLInstance = await new SQL.ConnectionPool(this.SQLConfig).connect();
        } catch (e) {
            console.log(e);
        }
    }

    OBJECT_DATA_NOT_VALID: MessageCodes = { Name: 'OBJECT_DATA_NOT_VALID', Code: 'E406' };
    DATABASE_NOT_INIT: MessageCodes = { Name: 'DATABASE_NOT_INIT', Code: 'E000' };
    DATABASE_CREATE_USER: MessageCodes = { Name: 'DATABASE_CREATE_USER', Code: 'E001' };

    SQLConfig: SQL.config;
    SQLInstance: SQL.ConnectionPool;
    Encrypt: string;

    /**
     * InitVariables
     */
    public InitVariables() {
        this.SQLConfig = {
            database: process.env.DATABASE,
            server: process.env.SERVER,
            user: process.env.USER,
            password: process.env.PASSWORD,
            options: {
                encrypt: false,
                enableArithAbort: true
            }
        };
        this.Encrypt = process.env.ENCRYPT;
    }

}

export default App.getInstance();