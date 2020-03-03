CREATE TABLE [dbo].[Users] (
    [Id]                              UNIQUEIDENTIFIER NOT NULL,
    [EmailAddress]                    NVARCHAR (255)   NOT NULL,
    [Username]                        NVARCHAR (100)   NOT NULL,
    [Password]                        NVARCHAR (100)   NOT NULL,
    [Age]                             INT              NOT NULL,
    [Name]                            NVARCHAR (MAX)   NOT NULL,
    [Gender]                          CHAR (1)         NOT NULL,
    [CreateAt]                        DATETIME       NOT NULL,
    [EmailValidationCode]             NVARCHAR (20)    NOT NULL,
    [EmailValidationCode_IsValidated] BIT              DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    UNIQUE NONCLUSTERED ([Username] ASC),
    UNIQUE NONCLUSTERED ([EmailAddress] ASC)
);