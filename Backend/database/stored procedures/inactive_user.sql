ALTER PROCEDURE [dbo].InactiveUser
    @Id                              NVARCHAR (MAX),
    @User                            NVARCHAR (100),
    @Password                        NVARCHAR (16)
AS

BEGIN

    OPEN SYMMETRIC KEY SymmetricKey1
    DECRYPTION BY CERTIFICATE Certificate1;

    DECLARE @IdUser UNIQUEIDENTIFIER;
    DECLARE @PasswordSelect NVARCHAR (255);

    BEGIN TRY

    SELECT TOP(1)
        @IdUser = Id,
        @PasswordSelect = Password
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

    IF(@Password != CONVERT(varchar, DecryptByKey(@PasswordSelect)))
        BEGIN
        RAISERROR('A003', 16, 1)
        RETURN;
    END

    CLOSE SYMMETRIC KEY SymmetricKey1;

    UPDATE
        [dbo].Users
    SET
        [IsActiveUser] = ~[IsActiveUser]
    WHERE
        [Id] = @Id AND
        ([EmailAddress] = @User OR [Username] = @User)
        
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