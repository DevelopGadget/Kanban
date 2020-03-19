CREATE TABLE MembersProject(

    [IdProject] UNIQUEIDENTIFIER NOT NULL,
    [IdUser] UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY ([IdProject]) REFERENCES [dbo].Projects(Id),
    FOREIGN KEY ([IdUser]) REFERENCES [dbo].Users(Id)

);