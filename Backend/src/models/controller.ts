import { Response, Request } from 'express';
import ResponseData from './response_data';

interface Controller {
    Get(req : Request, res: Response): Promise<Response<ResponseData>>;
    GetId(req : Request, res: Response): Promise<Response<ResponseData>>;
    Post(req : Request, res: Response): Promise<Response<ResponseData>>;
    Put(req : Request, res: Response): Promise<Response<ResponseData>>;
    Delete(req : Request, res: Response): Promise<Response<ResponseData>>;
}

export default Controller;