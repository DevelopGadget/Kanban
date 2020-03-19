CREATE TABLE [dbo].Projects
(
    [Id] UNIQUEIDENTIFIER NOT NULL,
    [Name] VARCHAR(50) NOT NULL,
    [Description] VARCHAR(100) NOT NULL,
    [CreateAt] DATETIME NOT NULL,
    [Admin] UNIQUEIDENTIFIER NOT NULL,
    [IsActiveProject] BIT DEFAULT 1 NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([Admin]) REFERENCES [dbo].Users(Id)
);