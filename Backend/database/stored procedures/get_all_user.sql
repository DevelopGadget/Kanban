ALTER PROCEDURE [dbo].GetAllUser
    @PageNumber INT = 1,
    @PageSize   INT = 100,
    @Id                      NVARCHAR (MAX),
    @User                    NVARCHAR (255)
AS
BEGIN
    SELECT
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
    FROM [dbo].Users
    WHERE
        [Id] != @Id AND [IsActiveUser] = 1 AND [EmailValidationCode_IsValidated] = 1 AND
        ([EmailAddress] != @User OR [Username] != @User)
    ORDER BY [Id] ASC
    OFFSET @PageSize * (@PageNumber - 1) ROWS
    FETCH NEXT @PageSize ROWS ONLY
    OPTION
    (RECOMPILE);
END