CREATE PROCEDURE [dbo].ManagementMembers 
    @Id NVARCHAR(MAX),
    @IdUser NVARCHAR(MAX),
    @IdType NVARCHAR(MAX),
    @Type BIT
AS
BEGIN
    DECLARE @IdCurrent NVARCHAR(MAX);
    DECLARE @Admin NVARCHAR(MAX);
    BEGIN TRY

        SELECT
            @IdCurrent = [Id],
            @Admin = [Admin]
        FROM [dbo].Projects
        WHERE  @Id = [Id];

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

        IF(@Type = 1)
            BEGIN
                INSERT INTO [dbo].MembersProject(
                    [IdProject],
                    [IdUser]
                )
                VALUES(
                    @IdCurrent,
                    @IdType
                )
            END
        ELSE 
            BEGIN
                UPDATE [dbo].MembersProject
                SET
                    [IsActiveMember] = ~[IsActiveMember]
                WHERE [IdUser] = @IdType AND [IdProject] = @IdCurrent
            END

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