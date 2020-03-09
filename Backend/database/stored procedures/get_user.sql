CREATE PROCEDURE [dbo].GetUser
    @Id                              UNIQUEIDENTIFIER,
    @EmailAddress                    NVARCHAR (255)
AS

BEGIN TRY
    SELECT TOP(1)
        Id,
        EmailAddress,
        Name,
        Username,
        Gender,
        EmailValidationCode_IsValidated,
        IsActiveUser,
        CountryCode,
        CityName
    FROM
        [dbo.Users]
    WHERE
        Id = @Id AND
        EmailAddress = @EmailAddress
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