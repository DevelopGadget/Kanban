ALTER PROCEDURE [dbo].CreateUser
	@EmailAddress                    NVARCHAR (255),
	@Username                        NVARCHAR (100),
	@Password                        NVARCHAR (16),
	@FirstName                       NVARCHAR (100),
	@LastName                        NVARCHAR (100),
	@Gender                          CHAR (1),
	@CountryCode                     NVARCHAR (100),
	@CityName                        NVARCHAR (100),
	@UrlImage                        NVARCHAR (MAX),
	@EmailValidationCode             NVARCHAR (20)

AS

BEGIN TRY

	OPEN SYMMETRIC KEY SymmetricKey1
	DECRYPTION BY CERTIFICATE Certificate1;

	INSERT INTO [dbo].Users
	(
		[Id],
		[EmailAddress],
		[Username],
		[Password],
		[FirstName],
		[LastName],
		[Gender],
		[EmailValidationCode],
		[CreateAt],
		[CountryCode],
		[CityName],
		[UrlImage]
	)
	OUTPUT
		Inserted.Id
	VALUES
	(
		NEWID(),
		@EmailAddress,
		@Username,
		EncryptByKey (Key_GUID('SymmetricKey1'),@Password),
		@FirstName,
		@LastName,
		@Gender,
		EncryptByKey (Key_GUID('SymmetricKey1'),@EmailValidationCode),
		CURRENT_TIMESTAMP,
		@CountryCode,
		@CityName,
		@UrlImage
	)
	CLOSE SYMMETRIC KEY SymmetricKey1;
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