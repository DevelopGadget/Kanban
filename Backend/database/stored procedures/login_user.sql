CREATE PROCEDURE [dbo].LoginUser
    @Password                        NVARCHAR (255),
    @User                            NVARCHAR (100)
AS

BEGIN

    DECLARE @PasswordSelect NVARCHAR (255);
    DECLARE @Id             UNIQUEIDENTIFIER;
    DECLARE @EmailAddress NVARCHAR(255);
    DECLARE @LastName NVARCHAR(100);
    DECLARE @FirstName NVARCHAR(100);
    DECLARE @Username NVARCHAR(100);
    DECLARE @Gender CHAR;
    DECLARE @EmailValidationCode_IsValidated BIT;
    DECLARE @IsActiveUser BIT;
    DECLARE @CountryCode NVARCHAR(5);
    DECLARE @CityName NVARCHAR(100);

    BEGIN TRY

    SELECT TOP(1)
        @IsActiveUser = IsActiveUser,
        @PasswordSelect = Password,
        @Id = Id,
        @EmailAddress = EmailAddress,
        @LastName = LastName,
        @Username = Username,
        @Gender = Gender,
        @EmailValidationCode_IsValidated = EmailValidationCode_IsValidated,
        @CountryCode = CountryCode,
        @CityName = CityName,
        @FirstName = FirstName
    FROM
        [dbo].Users
    WHERE
        EmailAddress = @User OR Username = @User

    IF(@IsActiveUser IS NULL OR @IsActiveUser = 0)
        BEGIN
        RAISERROR('A010', 16, 1)
        RETURN;
    END
    
    IF(@Password != @PasswordSelect)
        BEGIN
        RAISERROR('A001', 16, 1)
        RETURN;
    END

    IF(@EmailValidationCode_IsValidated != @EmailValidationCode_IsValidated)
        BEGIN
        RAISERROR('A002', 16, 1)
        RETURN;
    END

    SELECT
        @Id AS Id,
        @Username AS Username,
        @CityName AS CityName,
        @CountryCode AS CountryCode,
        @EmailAddress AS EmailAddress,
        @Gender AS Gender,
        @FirstName AS FirstName,
        @LastName AS LastName,
        @EmailValidationCode_IsValidated AS EmailValidationCode_IsValidated,
        @IsActiveUser AS IsActiveUser;
        
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
	ROLLBACK

	DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  

    SELECT
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();  
 
    RAISERROR (@ErrorMessage, -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState -- State.  
               );  

END CATCH

END