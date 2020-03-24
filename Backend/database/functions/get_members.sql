ALTER FUNCTION [dbo].GetMembers (@IdProject UNIQUEIDENTIFIER)
RETURNS TABLE
AS
RETURN (
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
        ON [IdProject] = @IdProject AND [IdUser] = Users.[Id]
    WHERE [IsActiveMember] = 1
);