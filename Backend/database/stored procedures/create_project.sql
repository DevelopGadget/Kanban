ALTER PROCEDURE [dbo].CreateProject
    @Name NVARCHAR(50),
    @Description NVARCHAR(100),
    @IdUser NVARCHAR(100)
AS
BEGIN TRY

    INSERT INTO [dbo].Projects(
        [Id],
        [Name],
        [Description],
        [CreateAt],
        [Admin]
    )
    OUTPUT
        Inserted.[Id],
        Inserted.[Name],
        Inserted.[Description],
        Inserted.[Admin],
        Inserted.[CreateAt],
        '[]' AS [Members]
    VALUES(
        NEWID(),
        @Name,
        @Description,
        CURRENT_TIMESTAMP,
        @IdUser
    )    

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