ALTER PROCEDURE [dbo].GetAllProject
    @PageNumber INT = 1,
    @PageSize   INT = 100,
    @Id                      NVARCHAR (MAX)
AS
BEGIN
    SELECT P
    FROM [dbo].Projects P RIGHT JOIN [dbo].MembersProject M
    ON P.[Id] = M.[IdProject] AND M.[IsActiveMember] = 1 AND (P.[Admin] = @Id OR @Id = M.[IdUser])
    WHERE
        P.[IsActiveProject] = 1
    ORDER BY P.[Id] ASC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END