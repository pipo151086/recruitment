USE master
GO

DROP DATABASE IF EXISTS [TestDevices]
GO

CREATE DATABASE TestDevices
GO
USE TestDevices
GO

create table devices (
		id VARCHAR(64), 
		[location] INT,
		mac_address varchar(64),
		connected BIT,
		parent_location INT,
		updated_at DateTime,
		signal float,
		PRIMARY KEY (id)
)

DECLARE @JSON VARCHAR(MAX)

SELECT @JSON = BulkColumn
FROM OPENROWSET 
(BULK '\\10.10.0.50\TestForms\devices.json', SINGLE_CLOB) 
AS j

--SELECT ISJSON(@JSON) 

--If (ISJSON(@JSON)=1)
--SELECT @JSON AS 'JSON Text'

--Select * FROM OPENJSON (@JSON) 

/*SELECT *
FROM OPENJSON (@JSON) 
WITH (id VARCHAR(64), 
		[location] INT,
		mac_address varchar(64),
		connected BIT,
		parent_location INT,
		updated_at DateTime,
		signal float
		);*/

insert into TestDevices..devices (id, [location], mac_address,connected,parent_location,updated_at,signal)
(SELECT *
FROM OPENJSON (@JSON) 
WITH (id VARCHAR(64), 
		[location] INT,
		mac_address varchar(64),
		connected BIT,
		parent_location INT,
		updated_at DateTime,
		signal float
		))

select * from TestDevices..devices


