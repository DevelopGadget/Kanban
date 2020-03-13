import Crypto from 'crypto';
import Config from '../Config/app';
import JWT from 'jsonwebtoken';
import ResponseData from '../models/response_data';
import SgEmail from '@sendgrid/mail';

class Auth {
    private static instance: Auth;

    public static getInstance(): Auth {
        if (!Auth.instance) {
            SgEmail.setApiKey(Config.EmailConfig.Key);
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

    public async SendEmail(To: string, Code: string): Promise<any> {
        try {
            const data: any = {
                'to': To,
                'from': Config.EmailConfig.Email,
                'templateId': Config.EmailConfig.TemplateId,
                'subject': 'Bienvenido, Código de activación ✔',
                'dynamic_template_data': {
                    'username': To.split('@')[0],
                    'code': Code
                }
            }
            return await SgEmail.send(data);
        } catch (error) {
            return error;
        }
    }

    public CreateToken(Id: string, Email: string): string {
        return JWT.sign({ sub: Id, EmailAddress: Email }, Config.PrivateKey, { algorithm: 'RS256', expiresIn: '1d' });
    }

    public DecodeToken(Token: string): ResponseData {
        try {
            const payload = JWT.verify(Token, Config.PublicKey, { algorithms: ['RS256'] });
            return { CodeError: null, Message: payload, IsError: false, StatusCode: 200 };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                const payload = JWT.verify(Token, Config.PublicKey, { ignoreExpiration: true });
                return { CodeError: Config.EXPIRE_TOKEN, Message: payload, IsError: true, StatusCode: 401 };
            }
            return { CodeError: Config.INVALID_TOKEN, Message: error, IsError: true, StatusCode: 401 };
        }
    }

}

export default Auth.getInstance();