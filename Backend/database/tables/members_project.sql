CREATE TABLE [dbo].MembersProject(

    [IdProject] UNIQUEIDENTIFIER NOT NULL,
    [IdUser] UNIQUEIDENTIFIER NOT NULL,
    [IsActiveMember] BIT DEFAULT 1,
    FOREIGN KEY ([IdProject]) REFERENCES [dbo].Projects(Id),
    FOREIGN KEY ([IdUser]) REFERENCES [dbo].Users(Id)

);