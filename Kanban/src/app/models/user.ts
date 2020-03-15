export default interface User {

    Id: string;
    Username?: string;
    CityName?: string;
    CountryCode?: string;
    EmailAddress: string;
    Gender?: string;
    FirstName?: string;
    LastName?: string;
    EmailValidationCode_IsValidated?: boolean;
    IsActiveUser?: boolean;
    Token?: string;

}