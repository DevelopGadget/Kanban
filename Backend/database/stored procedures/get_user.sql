ALTER PROCEDURE [dbo].GetUser
    @Id                      NVARCHAR (MAX),
    @User                    NVARCHAR (255)
AS

BEGIN
    
    DECLARE @IdUser UNIQUEIDENTIFIER;
    DECLARE @EmailAddress VARCHAR(255);
    DECLARE @LastName VARCHAR(100);
    DECLARE @FirstName VARCHAR(100);
    DECLARE @Username VARCHAR(100);
    DECLARE @Gender CHAR(1);
    DECLARE @EmailValidationCode_IsValidated BIT;
    DECLARE @IsActiveUser BIT;
    DECLARE @CountryCode VARCHAR(5);
    DECLARE @CityName VARCHAR(100);
    DECLARE @UrlImage VARCHAR(MAX);

    BEGIN TRY

        SELECT TOP(1)
            @IdUser = [Id],
            @EmailAddress = [EmailAddress],
            @LastName = [LastName],
            @FirstName = [FirstName],
            @Username = [Username],
            @Gender = [Gender],
            @EmailValidationCode_IsValidated = [EmailValidationCode_IsValidated],
            @IsActiveUser = [IsActiveUser],
            @CountryCode = [CountryCode],
            @CityName = [CityName],
            @UrlImage = [UrlImage]
        FROM
            [dbo].Users
        WHERE
            [Id] = @Id AND
            ([EmailAddress] = @User OR [Username] = @User)

        IF(@IdUser IS NULL)
            BEGIN
            RAISERROR('E404', 16, 1)
            RETURN;
        END

        IF(@IsActiveUser IS NULL OR @IsActiveUser = 0)
            BEGIN
            RAISERROR('A002', 16, 1)
            RETURN;
        END

        SELECT
            @IdUser AS [Id],
            @Username AS [Username],
            @CityName AS [CityName],
            @CountryCode AS [CountryCode],
            @EmailAddress AS [EmailAddress],
            @Gender AS [Gender],
            @FirstName AS [FirstName],
            @LastName AS [LastName],
            @EmailValidationCode_IsValidated AS [EmailValidationCode_IsValidated],
            @IsActiveUser AS [IsActiveUser],
            @UrlImage AS [UrlImage];

    END TRY
    BEGIN CATCH
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