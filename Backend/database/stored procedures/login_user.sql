ALTER PROCEDURE [dbo].LoginUser
    @Password                        NVARCHAR (255),
    @User                            NVARCHAR (100)
AS

BEGIN

    OPEN SYMMETRIC KEY SymmetricKey1
    DECRYPTION BY CERTIFICATE Certificate1;

    DECLARE @PasswordSelect NVARCHAR (255);
    DECLARE @Id NVARCHAR (255);
    DECLARE @EmailAddress NVARCHAR(255);
    DECLARE @LastName NVARCHAR(100);
    DECLARE @FirstName NVARCHAR(100);
    DECLARE @Username NVARCHAR(100);
    DECLARE @Gender CHAR;
    DECLARE @EmailValidationCode_IsValidated BIT;
    DECLARE @IsActiveUser BIT;
    DECLARE @CountryCode NVARCHAR(5);
    DECLARE @CityName NVARCHAR(100);
    DECLARE @UrlImage NVARCHAR(MAX);

    BEGIN TRY

    SELECT TOP(1)
        @IsActiveUser = [IsActiveUser],
        @PasswordSelect = [Password],
        @Id = [Id],
        @EmailAddress = [EmailAddress],
        @LastName = [LastName],
        @Username = [Username],
        @Gender = [Gender],
        @EmailValidationCode_IsValidated = [EmailValidationCode_IsValidated],
        @CountryCode = [CountryCode],
        @CityName = [CityName],
        @FirstName = [FirstName],
        @UrlImage = [UrlImage]
    FROM
        [dbo].Users
    WHERE
        [EmailAddress] = @User OR [Username] = @User

    IF(@Id IS NULL)
        BEGIN
        RAISERROR('E404', 16, 1)
        RETURN;
    END

    IF(@IsActiveUser IS NULL OR @IsActiveUser = 0)
        BEGIN
        RAISERROR('A002', 16, 1)
        RETURN;
    END
    
    IF(@Password != CONVERT(varchar, DecryptByKey(@PasswordSelect)))
        BEGIN
        RAISERROR('A003', 16, 1)
        RETURN;
    END

    IF(@EmailValidationCode_IsValidated = 0)
        BEGIN
        RAISERROR('A004 %s', 16, 1, @Id)
        RETURN;
    END

    CLOSE SYMMETRIC KEY SymmetricKey1;

    SELECT
        @Id AS [Id],
        @Username AS [Username],
        @CityName AS [CityName],
        @CountryCode AS [CountryCode],
        @EmailAddress AS [EmailAddress],
        @Gender AS [Gender],
        @UrlImage AS [UrlImage],
        @FirstName AS [FirstName],
        @LastName AS [LastName],
        @EmailValidationCode_IsValidated AS [EmailValidationCode_IsValidated],
        @IsActiveUser AS [IsActiveUser];
        
END TRY
BEGIN CATCH
	CLOSE SYMMETRIC KEY SymmetricKey1;
	IF @@TRANCOUNT > 0
	ROLLBACK

    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorState INT;  
    DECLARE @ErrorNumber INT;  

    SELECT
		@ErrorSeverity = ERROR_SEVERITY(),
		@ErrorState = ERROR_STATE(),
 		@ErrorNumber = ERROR_NUMBER(),
        @ErrorMessage = ERROR_MESSAGE();

    RAISERROR ('%i %s', -- Message text.  
               @ErrorSeverity, -- Severity.  
               @ErrorState, -- State.
			   @ErrorNumber,
               @ErrorMessage --Error Number  
               );  

END CATCH

END