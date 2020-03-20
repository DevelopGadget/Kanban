ALTER PROCEDURE [dbo].GetProject
    @IdProject NVARCHAR (MAX),
    @IdUser NVARCHAR (MAX)
AS

BEGIN
    DECLARE @Members TABLE(
        [Id] UNIQUEIDENTIFIER NOT NULL,
        [EmailAddress] NVARCHAR (255) NOT NULL,
        [Username] NVARCHAR (100) NOT NULL,
        [UrlImage] NVARCHAR (MAX) NULL,
        [CountryCode] NVARCHAR (5) NULL,
        [CityName] NVARCHAR (100) NULL,
        [LastName] NVARCHAR (100) NOT NULL,
        [FirstName] NVARCHAR (100) NOT NULL,
        [Gender] CHAR (1) NULL,
        [EmailValidationCode_IsValidated] BIT DEFAULT 0 NOT NULL,
        [IsActiveMember] BIT DEFAULT 1 NOT NULL,
        [IsActiveUser] BIT DEFAULT 1 NOT NULL
    );
    DECLARE @ProjectCurrent TABLE(
        [Id] UNIQUEIDENTIFIER NOT NULL,
        [Name] NVARCHAR(50),
        [Description] NVARCHAR(100),
        [CreateAt] DATETIME NOT NULL,
        [IdUser] UNIQUEIDENTIFIER NOT NULL,
        [EmailAddress] NVARCHAR (255) NOT NULL,
        [Username] NVARCHAR (100) NOT NULL,
        [UrlImage] NVARCHAR (MAX) NULL,
        [CountryCode] NVARCHAR (5) NULL,
        [CityName] NVARCHAR (100) NULL,
        [LastName] NVARCHAR (100) NOT NULL,
        [FirstName] NVARCHAR (100) NOT NULL,
        [Gender] CHAR (1) NULL,
        [EmailValidationCode_IsValidated] BIT DEFAULT 0 NOT NULL,
        [IsActiveUser] BIT DEFAULT 1 NOT NULL
    );
    BEGIN TRY
        INSERT INTO @ProjectCurrent(
            [Id],
            [Name],
            [Description],
            [CreateAt],
            [IdUser],
            [Username],
            [CityName],
            [CountryCode],
            [EmailAddress],
            [Gender],
            [FirstName],
            [UrlImage],
            [LastName],
            [EmailValidationCode_IsValidated],
            [IsActiveUser]
        )
        SELECT 
            Pro.[Id],
            Pro.[Name],
            Pro.[Description],
            Pro.[CreateAt],
            Users.[Id] AS IdUser,
            Users.[Username],
            Users.[CityName],
            Users.[CountryCode],
            Users.[EmailAddress],
            Users.[Gender],
            Users.[FirstName],
            Users.[UrlImage],
            Users.[LastName],
            Users.[EmailValidationCode_IsValidated],
            Users.[IsActiveUser]
        FROM [dbo].Projects Pro INNER JOIN [dbo].Users
        ON Pro.[Id] = @IdProject AND Admin = Users.[Id]; 

        IF NOT EXISTS(SELECT * FROM @ProjectCurrent)
            BEGIN
                RAISERROR('P404', 16, 1)
                RETURN;
            END

        INSERT INTO @Members (
            [Id],
            [Username],
            [CityName],
            [CountryCode],
            [EmailAddress],
            [Gender],
            [FirstName],
            [UrlImage],
            [LastName],
            [EmailValidationCode_IsValidated],
            [IsActiveUser]
        )
        SELECT 
            [IdUser],
            [Username],
            [CityName],
            [CountryCode],
            [EmailAddress],
            [Gender],
            [FirstName],
            [UrlImage],
            [LastName],
            [EmailValidationCode_IsValidated],
            [IsActiveUser]
        FROM @ProjectCurrent

        INSERT INTO @Members (
            [Id],
            [Username],
            [CityName],
            [CountryCode],
            [EmailAddress],
            [Gender],
            [FirstName],
            [UrlImage],
            [LastName],
            [EmailValidationCode_IsValidated],
            [IsActiveUser],
            [IsActiveMember]
        )
        SELECT
            Users.[Id],
            Users.[Username],
            Users.[CityName],
            Users.[CountryCode],
            Users.[EmailAddress],
            Users.[Gender],
            Users.[FirstName],
            Users.[UrlImage],
            Users.[LastName],
            Users.[EmailValidationCode_IsValidated],
            Users.[IsActiveUser],
            [IsActiveMember]
        FROM [dbo].MembersProject INNER JOIN [dbo].Users 
        ON IdProject = @IdProject AND IdUser = Users.[Id];

        IF NOT EXISTS(SELECT * FROM @Members WHERE [Id] = @IdUser)
            BEGIN
                RAISERROR('E404', 16, 1)
                RETURN;
            END

        SELECT 
            [Id],
            [Name],
            [Description],
            [CreateAt],
            [IdUser] AS [Admin],
            (SELECT * FROM @Members FOR JSON AUTO) AS [Members]
        FROM @ProjectCurrent

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