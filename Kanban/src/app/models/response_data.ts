
import MessageCodes from './message_codes';

interface ResponseData {

    Message?: any;
    IsError: boolean;
    StatusCode?: number;
    CodeError?: MessageCodes;

}

export default ResponseData;