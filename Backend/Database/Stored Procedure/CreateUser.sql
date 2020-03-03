CREATE PROCEDURE [dbo].CreateUser
    @EmailAddress                    NVARCHAR (255),
    @Username                        NVARCHAR (100)     ,
    @Password                        NVARCHAR (100)     ,
    @Age                             INT                ,
    @Name                            NVARCHAR (MAX)     ,
    @Gender                          CHAR (1)           ,
    @EmailValidationCode             NVARCHAR (20)   

AS

BEGIN TRY

	INSERT INTO [dbo].Users
	(
	  Id,
	  EmailAddress,
	  Username,
	  Password,
	  Age,
	  Name,
	  Gender,
	  EmailValidationCode,
	  CreateAt
	)
	VALUES
	(
		NEWID(),
		@EmailAddress,
		@Username,
		@Password,
		@Age,
		@Name,
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