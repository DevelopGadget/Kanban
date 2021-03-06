ALTER PROCEDURE [dbo].ValidateEmail
    @Id                              NVARCHAR (MAX),
    @User                            NVARCHAR (100) ,
    @Code                            NVARCHAR (100),
    @IsReSend                        BIT
AS

BEGIN

    OPEN SYMMETRIC KEY SymmetricKey1
    DECRYPTION BY CERTIFICATE Certificate1;

    DECLARE @EmailValidationCode_IsValidated BIT;
    DECLARE @IsActiveUser BIT;
    DECLARE @EmailValidationCode NVARCHAR(100);
    DECLARE @IdUser UNIQUEIDENTIFIER;

    BEGIN TRY

    SELECT TOP(1)
        @IdUser = [Id],
        @IsActiveUser = [IsActiveUser],
        @EmailValidationCode_IsValidated = [EmailValidationCode_IsValidated],
        @EmailValidationCode = [EmailValidationCode]
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

    IF(@EmailValidationCode_IsValidated = 1)
        BEGIN
        RAISERROR('A005', 16, 1)
        RETURN;
    END
    IF(@IsReSend = 0)
        BEGIN
            IF(@Code != CONVERT(varchar, DecryptByKey(@EmailValidationCode)))
            BEGIN
                RAISERROR('A006', 16, 1)
                RETURN;
            END

            CLOSE SYMMETRIC KEY SymmetricKey1;

            UPDATE
                [dbo].Users
            SET
                [EmailValidationCode] = NULL,
                [EmailValidationCode_IsValidated] = 1
            OUTPUT
                Inserted.[Id],
                Inserted.[Username],
                Inserted.[CityName],
                Inserted.[CountryCode],
                Inserted.[EmailAddress],
                Inserted.[UrlImage],
                Inserted.[Gender],
                Inserted.[FirstName],
                Inserted.[LastName],
                Inserted.[EmailValidationCode_IsValidated],
                Inserted.[IsActiveUser]
            WHERE
                [Id] = @Id AND
                ([EmailAddress] = @User OR [Username] = @User)

        END
    ELSE
        BEGIN
            UPDATE
                [dbo].Users
            SET
                [EmailValidationCode] = EncryptByKey (Key_GUID('SymmetricKey1'),@Code),
                [EmailValidationCode_IsValidated] = 0
            OUTPUT
                Inserted.[Id],
                Inserted.[Username]
            WHERE
                [Id] = @Id AND
                ([EmailAddress] = @User OR [Username] = @User)
        END
            
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