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
	OUTPUT Inserted.Id
	VALUES
	(
		NEWID(),
		@EmailAddress,
		@Username,
		@Password,
		@FirstName,
		@LastName,
		@Gender,
		@EmailValidationCode,
		CURRENT_TIMESTAMP
	)
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