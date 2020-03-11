CREATE TABLE [dbo].[Users] (
    [Id]                              UNIQUEIDENTIFIER NOT NULL,
    [EmailAddress]                    NVARCHAR (255)   NOT NULL,
    [Username]                        NVARCHAR (100)   NOT NULL,
    [Password]                        VARBINARY (MAX)  NOT NULL,
    [CountryCode]                     NVARCHAR (5)         NULL,
    [CityName]                        NVARCHAR (100)       NULL,
    [LastName]                        NVARCHAR (100)   NOT NULL,
    [FirstName]                       NVARCHAR (100)   NOT NULL,
    [Gender]                          CHAR (1)             NULL,
    [CreateAt]                        DATETIME         NOT NULL,
    [EmailValidationCode]             NVARCHAR (20)        NULL,
    [EmailValidationCode_IsValidated] BIT        DEFAULT 0 NOT NULL,
    [IsActiveUser] BIT              DEFAULT 1 NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    UNIQUE NONCLUSTERED ([Username] ASC),
    UNIQUE NONCLUSTERED ([EmailAddress] ASC)
);