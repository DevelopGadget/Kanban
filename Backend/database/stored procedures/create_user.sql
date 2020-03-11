CREATE PROCEDURE [dbo].CreateUser
	@EmailAddress                    NVARCHAR (255),
	@Username                        NVARCHAR (100),
	@Password                        NVARCHAR (16),
	@FirstName                       NVARCHAR (100),
	@LastName                        NVARCHAR (100),
	@Gender                          CHAR (1),
	@EmailValidationCode             NVARCHAR (20)

AS

BEGIN TRY

	OPEN SYMMETRIC KEY SymmetricKey1
	DECRYPTION BY CERTIFICATE Certificate1;

	INSERT INTO [dbo].Users
	(
	Id,
	EmailAddress,
	Username,
	Password,
	FirstName,
	LastName,
	Gender,
	EmailValidationCode,
	CreateAt
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
		CURRENT_TIMESTAMP
	)
	CLOSE SYMMETRIC KEY SymmetricKey1;
END TRY
BEGIN CATCH
	CLOSE SYMMETRIC KEY SymmetricKey1;
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