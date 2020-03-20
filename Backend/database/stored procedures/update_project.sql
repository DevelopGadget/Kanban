CREATE PROCEDURE [dbo].UpdateProject 
    @Name NVARCHAR(50),
    @Description NVARCHAR(100),
    @IdUser NVARCHAR(100),
    @Id NVARCHAR(100)
AS
BEGIN
    DECLARE @IdCurrent NVARCHAR(MAX);
    DECLARE @Admin NVARCHAR(MAX);
    BEGIN TRY

        SELECT 
            @IdCurrent = [Id],
            @Admin = [Admin]
        FROM [dbo].Projects
        WHERE @Id = [Id];

        IF(@IdCurrent IS NULL)
            BEGIN
                RAISERROR('P404', 16, 1)
                RETURN;
            END
        
        IF(@Admin != @IdUser)
            BEGIN
                RAISERROR('P404', 16, 1)
                RETURN;
            END

        UPDATE [dbo].projects
        SET
            [Name] = ISNULL(@Name, [Name]),
            [Description] = ISNULL(@Description, [Description])
        OUTPUT 
            deleted.[Id], 
            deleted.[Name], 
            deleted.[Description],
            deleted.[CreateAt] 
        WHERE @IdCurrent = [Id];

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