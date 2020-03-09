import Crypto from 'crypto';
import CryptoJS, { WordArray } from 'crypto-js';
import Config from '../Config/app'

class Auth {
    private static instance: Auth;

    public static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

    public async CreateCode(): Promise<any> {
        try {
            const buf = Crypto.randomBytes(4);
            return buf.toString('hex');
        } catch (error) {
            return new Error(error);
        }
    }

    public CryptoData(data: any, encrypt?: boolean): WordArray | string {
        if(encrypt)
            return CryptoJS.AES.encrypt(data, Config.Encrypt);
        else
            return CryptoJS.AES.decrypt(data, Config.Encrypt).toString(CryptoJS.enc.Utf8);
    }

}

export default Auth.getInstance();